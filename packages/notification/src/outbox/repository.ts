import type {
  NotificationOutbox,
  CreateNotificationOutboxInput

} from "./schemas"


export interface NotificationOutboxRepository {
  // 批量创建待发送任务
  enqueue(
    inputs: CreateNotificationOutboxInput[]
  ): Promise<void>

  // 查询单条发送任务
  findById(id: number): Promise<NotificationOutbox | null>

  // 原子领取待发送任务
  claimPending(
    limit: number
  ): Promise<NotificationOutbox[]>

  // 标记发送成功
  markSent(
    id: number,
    providerMessageId: string | null
  ): Promise<void>

  // 标记发送失败，并安排重试
  markRetry(
    id: number,
    error: string,
    nextRetryAt: string
  ): Promise<void>

  // 标记最终失败
  markFailed(
    id: number,
    error: string
  ): Promise<void>
}