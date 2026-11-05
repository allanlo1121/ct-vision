
import { formatDateTime } from "@workspace/shared/utils"
import { NotificationChannel, notificationChannelSchema } from "@workspace/shared"

import { FindNotificationRulesInput } from "@workspace/notification/rule"
import { CreateNotificationOutboxInput } from "@workspace/notification/outbox"

import { notificationEventRepository, notificationRuleRepository, notificationSubcriptionRepository, notificationTemplateRepository, notificationOutboxRepository, employeeContactRepository } from "../repositories"
import { resolveNotificationRecipients } from "../utils/resolve-notification-recipient"


import { renderNotificationTemplate } from "../template/render"
type NotificationSkipReason =
  | "no_project"
  | "no_rules"
  | "no_subscriptions"
  | "no_contacts"
  | "no_available_template"
  | "no_recipients"

export async function processNotificationEvents(): Promise<void> {
  const events = await notificationEventRepository.findPending(10)

  for (const event of events) {
    try {
      const {
        source_type_code,
        event_type_code,
        level,
        project_id,
        payload,
        occurred_at,
      } = event

      const outboxMessages: CreateNotificationOutboxInput[] = []
      let skipReason: NotificationSkipReason | null = null

      // 1. 校验项目
      if (!project_id) {
        console.info("通知事件跳过：缺少项目ID", {
          eventId: event.id,
        })

        await notificationEventRepository.markProcessed(event.id)
        continue
      }

      // 2. 匹配规则
      const rules = await notificationRuleRepository.findRules({
        source_type_code,
        event_type_code,
        level,
      })

      if (rules.length === 0) {
        console.info("通知事件跳过：没有匹配规则", {
          eventId: event.id,
        })

        await notificationEventRepository.markProcessed(event.id)
        continue
      }

      // 3. 查询订阅人员
      const subscriptions =
        await notificationSubcriptionRepository.findRecipients({
          source_type_code,
          event_type_code,
          project_id,
          level,
        })

      if (subscriptions.length === 0) {
        console.info("通知事件跳过：没有订阅人员", {
          eventId: event.id,
          projectId: project_id,
        })

        await notificationEventRepository.markProcessed(event.id)
        continue
      }

      // 4. 获取员工联系方式
      const employeeIds = [
        ...new Set(subscriptions.map((item) => item.employee_id)),
      ]

      const employees =
        !skipReason
          ? await employeeContactRepository.findContactsByIds(
            employeeIds
          )
          : []

      if (!skipReason && employees.length === 0) {
        skipReason = "no_contacts"
      }

      // 5. 生成通知任务
      if (!skipReason) {
        const variables = {
          ...payload,
          occurred_at: formatDateTime(
            occurred_at,
            "yyyy年MM月dd日 HH:mm:ss"
          ),
        }

        let availableTemplateCount = 0

        for (const rule of rules) {
          const template =
            await notificationTemplateRepository.find(
              rule.template_id
            )

          if (!template || template.is_disabled) {
            continue
          }

          availableTemplateCount++

          const channelResult =
            notificationChannelSchema.safeParse(
              template.channel
            )

          if (!channelResult.success) {
            throw new Error(
              `不支持的通知渠道：${template.channel}`
            )
          }

          const recipients = resolveNotificationRecipients(
            employees,
            channelResult.data
          )

          if (recipients.length === 0) {
            continue
          }

          const title = renderNotificationTemplate(
            template.title_template ?? "",
            variables
          )

          const content = renderNotificationTemplate(
            template.body_template,
            variables
          ).replace(/\r\n/g, "\n")

          for (const recipient of recipients) {
            const dedupKey = [
              event.id,
              rule.id,
              recipient.channel,
              recipient.recipient,
            ].join(":")

            outboxMessages.push({
              event_id: event.id,
              rule_id: rule.id,
              channel: recipient.channel,
              recipient: recipient.recipient,
              title,
              content,
              dedup_key: dedupKey,
            })
          }
        }

        if (outboxMessages.length === 0) {
          skipReason =
            availableTemplateCount === 0
              ? "no_available_template"
              : "no_recipients"
        }
      }

      // 6. 有任务才入队
      if (outboxMessages.length > 0) {
        await notificationOutboxRepository.enqueue(
          outboxMessages
        )
      }

      // 7. 无论成功入队还是正常跳过，都标记已处理
      await notificationEventRepository.markProcessed(
        event.id
      )

      // 8. 统一记录处理结果
      if (skipReason) {
        console.info("通知事件跳过", {
          eventId: event.id,
          projectId: project_id,
          sourceType: source_type_code,
          eventType: event_type_code,
          reason: skipReason,
        })
      } else {
        console.info("通知事件入队完成", {
          eventId: event.id,
          outboxCount: outboxMessages.length,
        })
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error)

      console.error("通知事件处理失败", {
        eventId: event.id,
        error: message,
      })

      try {
        await notificationEventRepository.recordFailure(
          event.id,
          message
        )
      } catch (recordError) {
        console.error("通知事件失败记录写入失败", {
          eventId: event.id,
          error: recordError,
        })
      }
    }
  }
}