import type {
    NotificationSubscription,
    CreateNotificationSubscriptionInput,
    UpdateNotificationSubscriptionInput,
    FindNotificationRecipientsInput
} from "./subscription.schemas"


export interface NotificationSubscriptionRepository {
    find(id: number): Promise<NotificationSubscription | null>

    findByEmployeeId(
        employeeId: string
    ): Promise<NotificationSubscription[]>

    findAll(): Promise<NotificationSubscription[]>

    // 根据事件查找接收人
    findRecipients(
        input: FindNotificationRecipientsInput
    ): Promise<NotificationSubscription[]>


    create(input: CreateNotificationSubscriptionInput): Promise<void>

    update(
        id: number,
        input: UpdateNotificationSubscriptionInput
    ): Promise<void>

    delete(id: number): Promise<void>

    setDisabled(
        id: number,
        isDisabled: boolean
    ): Promise<void>
}

