import type {
  NotificationAttempt,
  CreateNotificationAttemptInput

} from "./attempt.schemas"


export interface NotificationAttemptRepository {
  // 创建发送任务尝试
  create(
    input: CreateNotificationAttemptInput
  ): Promise<void>

  // 查询单条发送任务
  findById(id: number): Promise<NotificationAttempt | null>

  // 查询某条 Outbox 的所有发送尝试
  findByOutboxId(
    outboxId: number
  ): Promise<NotificationAttempt[]>
}