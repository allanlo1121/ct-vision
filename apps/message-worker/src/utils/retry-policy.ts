import { NotificationChannel } from "@workspace/shared";
import { env } from "../config/env"

export interface NotificationRetryPolicy {
    maxAttempts: number
    retryDelays: number[]
}

export function getNotificationRetryPolicy(
    channel: NotificationChannel
): NotificationRetryPolicy {
    switch (channel) {
        case "sms":
            return {
                maxAttempts: env.SMS_MAX_ATTEMPTS,
                retryDelays: env.SMS_RETRY_DELAYS,
            }

        case "wecom":
            return {
                maxAttempts: env.WECOM_MAX_ATTEMPTS,
                retryDelays: env.WECOM_RETRY_DELAYS,
            }

        default:
            return {
                maxAttempts: env.SMS_MAX_ATTEMPTS,
                retryDelays: env.SMS_RETRY_DELAYS,
            }
    }
}


/**
 * 计算下一次重试时间
 * @param attemptNo 当前第几次发送（从1开始）
 * @param retryDelays 重试间隔，单位分钟
 * @returns ISO 8601 时间字符串
 */
export function calculateNextRetryAt(
  attemptNo: number,
  retryDelays: number[]
): string {
  const delayMinutes = retryDelays[attemptNo - 1]

  if (delayMinutes === undefined) {
    throw new Error(
      `未配置第 ${attemptNo} 次失败后的重试间隔`
    )
  }

  return new Date(
    Date.now() + delayMinutes * 60 * 1000
  ).toISOString()
}