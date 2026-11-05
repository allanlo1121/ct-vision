
import { createHmac } from "node:crypto"
import { env } from "../config/env"
import { smsApiResponseSchema, type NotificationSendResult } from "@workspace/shared/schemas"
import { NotificationProviderError } from "./types"

export interface NotificationSendInput {
  recipient: string
  title: string
  content: string
}

// export interface NotificationSendResult {
//   messageId?: string
// }

export interface NotificationProvider {
  send(
    input: NotificationSendInput
  ): Promise<NotificationSendResult>
}



export interface SmsApiResponse {
  code: number
  message: string
  data?: unknown
}

export interface SmsProviderConfig {
  endpoint: string
  username: string
  password: string
  prefix: string
  timeoutMs: number
}


/**
 * 生成短信 API HMAC 签名
 */
export function buildSmsSignature(
  username: string,
  password: string,
  timestamp: string
): string {
  const payload = `${username}${password}${timestamp}`

  return createHmac("sha256", "chituyunxin")
    .update(payload)
    .digest("hex")
}

/**
 * 短信发送 Provider
 */
export const smsNotificationProvider: NotificationProvider = {
  async send({
    recipient,
    title,
    content,
  }: NotificationSendInput): Promise<NotificationSendResult> {
    // console.log("starting sms delivery")
    // console.log("recipient", recipient)

    const config = {
      endpoint: env.SMS_ENDPOINT,
      username: env.SMS_USERNAME,
      password: env.SMS_PASSWORD,
      prefix: env.SMS_PREFIX,
      timeoutMs: env.SMS_TIMEOUT_MS,
    }


    if (!recipient.trim()) {
      throw new NotificationProviderError(
        "sms",
        "INVALID_RECIPIENT",
        "短信接收手机号不能为空",
        false
      )
    }

    if (!content.trim()) {
      throw new NotificationProviderError(
        "sms",
        "EMPTY_CONTENT",
        "短信内容不能为空",
        false
      )
    }

    const timestamp = Date.now().toString()

    const signature = buildSmsSignature(
      config.username,
      config.password,
      timestamp
    )

    const finalContent = [
      config.prefix,
      title,
      content,
    ]
      .filter(Boolean)
      .join("\n")

    const response = await fetch(config.endpoint, {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        "X-Timestamp": timestamp,
        "X-Signature": signature,
      },

      body: JSON.stringify({
        username: config.username,
        password: config.password,
        mobiles: [recipient],
        content: finalContent,
      }),

      signal: AbortSignal.timeout(config.timeoutMs),
    })

    if (!response.ok) {
      const retryable =
        response.status === 408 ||
        response.status === 429 ||
        response.status >= 500

      throw new NotificationProviderError(
        "sms",
        response.status,
        `短信 HTTP 请求失败：${response.status} ${response.statusText}`,
        retryable
      )
    }

    const result = smsApiResponseSchema.parse(
      await response.json()
    )
    // const result = await response.json()

    // console.log("sme result", result)

    // 假设短信平台 code=200 表示成功
    if (result.code !== 200) {
      throw new NotificationProviderError(
        "sms",
        result.code,
        result.message ?? result.msg ?? "短信发送失败",
        true
      )
    }

    // 转换成内部统一结果
    return {
      code: 0,
      message: result.message ?? result.msg ?? "ok",
      messageId: result.data?.batchId?.toString() ?? null,
    } satisfies NotificationSendResult
  },
}
