
import type {NotificationProvider }  from "./types"
import { wecomNotificationProvider } from "./wecom.provider"
import {  smsNotificationProvider } from "./sms.provider"

export const notificationProviderRegistry = {
  get(channelCode: string): NotificationProvider {
    switch (channelCode) {
      case "wecom":
        return wecomNotificationProvider

      case "sms":
        return smsNotificationProvider

      default:
        throw new Error(
          `Unsupported notification channel: ${channelCode}`
        )
    }
  },
}



export class NotificationProviderError extends Error {
  constructor(
    public readonly channel: string,
    public readonly code: number,
    message: string,
  ) {
    super(message)
    this.name = "NotificationProviderError"
  }
}