
import { env } from "../config/env"
import { wecomApiResponseSchema, type NotificationSendResult } from "@workspace/shared"

import { NotificationProviderError } from "./types"

import type {
  NotificationProvider,
  NotificationSendInput
} from "./types"



export const wecomNotificationProvider: NotificationProvider = {
  async send({
    recipient,
    title,
    content
  }: NotificationSendInput): Promise<NotificationSendResult> {


    if (!content.trim()) {
      throw new NotificationProviderError(
        "wecom",
        "EMPTY_CONTENT",
        "信息内容不能为空",
        false
      )
    }

    const markdownContent = [
      title ? `### ${title}` : null,
      content,
    ]
      .filter(Boolean)
      .join("\n\n")

    // console.log("content", markdownContent)

    const response = await fetch(env.WECHAT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msgtype: "markdown",
        markdown: {
          content: markdownContent,
        },
      }),
      signal: AbortSignal.timeout(env.WECOM_TIMEOUT_MS),
    })

    if (!response.ok) {
      const retryable =
        response.status === 408 ||
        response.status === 429 ||
        response.status >= 500

      throw new NotificationProviderError(
        "sms",
        response.status,
        `企业微信 请求失败：${response.status} ${response.statusText}`,
        retryable
      )
    }

    const result = wecomApiResponseSchema.parse(await response.json())

    // console.log("wecom result", result)

    if (result.errcode !== 0) {
      throw new NotificationProviderError(
        "wecom",
        result.errcode,
        result.errmsg ?? "企业微信发送失败",
        true
      )
    }

    return {
      code: 0,
      message: result.errmsg ?? "ok",
      messageId: null,
    } satisfies NotificationSendResult
  },
}
