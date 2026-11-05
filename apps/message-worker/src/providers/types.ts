export interface NotificationSendInput {
    recipient: string
    title: string
    content: string
}

import { type NotificationSendResult } from "@workspace/shared/schemas"

export interface NotificationProvider {
    send(
        input: NotificationSendInput
    ): Promise<NotificationSendResult>
}

export class NotificationProviderError extends Error {
  constructor(
    public readonly channel: string,
    public readonly code: number | string,
    message: string,
    public readonly retryable: boolean = true,
  ) {
    super(message)
    this.name = "NotificationProviderError"
  }
}