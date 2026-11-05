
import { notificationOutboxRepository, notificationAttemptRepository } from "../repositories"
import { notificationProviderRegistry } from "../providers"
import { NotificationProviderError } from "../providers/types"
import { getNotificationRetryPolicy, calculateNextRetryAt } from "../utils/retry-policy"


export async function processNotificationOutbox(): Promise<void> {
  // TODO:
  // 1. 领取待发送通知
  // 1. 原子领取待发送消息
  const messages = await notificationOutboxRepository.claimPending(1)
  // console.log("process outbox claimPending", messages)
  // 2. 根据 channel 选择 Provider
  for (const message of messages) {
    const attemptNo = message.attempt_count + 1

    try {
      // 2. 选择发送 Provider
      const provider = notificationProviderRegistry.get(
        message.channel
      )

      // console.log("send provider", provider)

      // 3. 发送消息
      const result = await provider.send({
        recipient: message.recipient,
        title: message.title,
        content: message.content,
      })

      // console.log("send result", result)

      // 4. 记录发送尝试
      await notificationAttemptRepository.create({
        outbox_id: message.id,
        attempt_no: attemptNo,
        status: "success",
        provider_message_id: result.messageId ?? null,
        response_code: String(result.code) ?? null,
        error_message: result.message ?? null,
      })

      // 5. 更新发送成功状态
      await notificationOutboxRepository.markSent(
        message.id,
        result.messageId
      )

    } catch (error) {
      const providerError =
        error instanceof NotificationProviderError
          ? error
          : new NotificationProviderError(
            message.channel,
            "UNKNOWN_ERROR",
            error instanceof Error ? error.message : String(error),
            true
          )

      console.error("短信发送异常:", providerError)

      const attemptNo = message.attempt_count
      const policy = getNotificationRetryPolicy(message.channel)

      if (
        !providerError.retryable ||
        attemptNo >= policy.maxAttempts
      ) {

        // 6. 记录失败尝试
        await notificationAttemptRepository.create({
          outbox_id: message.id,
          attempt_no: attemptNo,
          status: "failed",
          provider_message_id: null,
          response_code: String(providerError.code),
          error_message: providerError.message ?? null,
        })

        // 7. 失败重试或最终失败       
        await notificationOutboxRepository.markFailed(
          message.id,
          providerError.message
        )
      } else {
        await notificationOutboxRepository.markRetry(
          message.id,
          providerError.message,
          calculateNextRetryAt(attemptNo, policy.retryDelays)
        )
      }
    }
  }

}



