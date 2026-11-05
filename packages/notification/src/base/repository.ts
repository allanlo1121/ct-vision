import type {
  NotificationEvent,
  CreateNotificationEventInput,
  UpdateNotificationEventInput,
  NotificationTaskInput
} from "./schemas"


export interface NotificationEventRepository {
  // findById(id: number): Promise<NotificationEvent | null>

  // findAll(): Promise<NotificationEvent[]>

  findPending(limit: number): Promise<NotificationEvent[]>

  // completeDispatch(eventId: number, tasks: NotificationTaskInput[]): Promise<boolean>
  markProcessed(eventId: number): Promise<void>
  recordFailure(eventId: number, message: string): Promise<void>

  create(input: CreateNotificationEventInput): Promise<void>

  // update(
  //   id: number,
  //   input: UpdateNotificationEventInput
  // ): Promise<void>

  // delete(id: number): Promise<void>
}
