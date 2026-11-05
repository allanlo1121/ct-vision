
import { formatDateTime } from "@workspace/shared/utils"
import { NotificationChannel, notificationChannelSchema } from "@workspace/shared"

import { FindNotificationRulesInput } from "@workspace/notification/rule"
import { CreateNotificationOutboxInput } from "@workspace/notification/outbox"

import { notificationEventRepository, notificationRuleRepository, notificationSubcriptionRepository, notificationTemplateRepository, notificationOutboxRepository, employeeContactRepository } from "../repositories"
import {  resolveNotificationRecipients } from "../utils/resolve-notification-recipient"


import { renderNotificationTemplate } from "../template/render"
export async function processNotificationEvents(): Promise<void> {
  // 1. 查询待处理事件
  const events = await notificationEventRepository.findPending(10)

  for (const event of events) {
    try {
      const {
        source_type_code,
        event_type_code,
        level,
        organization_id,
        payload,
        occurred_at,
      } = event

      // 2. 匹配通知规则
      const rules = await notificationRuleRepository.findRules({
        source_type_code,
        event_type_code,
        level,
      })

      const outboxMessages: CreateNotificationOutboxInput[] = []

      // 3. 有规则且有组织时，才需要查询订阅人员
      if (rules.length > 0 && organization_id) {
        const subscriptions =
          await notificationSubcriptionRepository.findRecipients({
            source_type_code,
            event_type_code,
            organization_id,
            level,
          })

        if (subscriptions.length > 0) {
          // 4. 提取员工 ID 并去重
          const employeeIds = [
            ...new Set(
              subscriptions.map((item) => item.employee_id)
            ),
          ]

          // 5. 批量获取员工联系方式
          const employees =
            await employeeContactRepository.findContactsByIds(
              employeeIds
            )

          // 6. 构建模板变量（每个事件只需一次）
          const variables = {
            ...payload,
            occurred_at: formatDateTime(occurred_at,"yyyy年MM月dd日 HH:mm:ss"),
          }

          // 7. 遍历通知规则
          for (const rule of rules) {
            const template =
              await notificationTemplateRepository.find(
                rule.template_id
              )

            if (!template || template.is_disabled) {
              continue
            }

            // 验证通知渠道
            const channelResult =
              notificationChannelSchema.safeParse(
                template.channel
              )

            if (!channelResult.success) {
              throw new Error(
                `不支持的通知渠道：${template.channel}`
              )
            }

            // 8. 根据渠道解析接收人
            const recipients = resolveNotificationRecipients(
              employees,
              channelResult.data
            )

            if (recipients.length === 0) {
              continue
            }

            // 9. 渲染标题和内容
            const title = renderNotificationTemplate(
              template.title_template ?? "",
              variables
            )

            const content = renderNotificationTemplate(
              template.body_template,
              variables
            ).replace(/\r\n/g, "\n")

            // 10. 生成 Outbox
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
        }
      }

      // 11. 批量入队（空数组也可以调用）
      await notificationOutboxRepository.enqueue(
        outboxMessages
      )

      // 12. 标记事件已处理
      await notificationEventRepository.markProcessed(
        event.id
      )

      console.log("通知事件处理完成", {
        eventId: event.id,
        outboxCount: outboxMessages.length,
      })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error)

      console.error("通知事件处理失败", {
        eventId: event.id,
        error: message,
      })

      // 13. 记录失败，等待下一次重试
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