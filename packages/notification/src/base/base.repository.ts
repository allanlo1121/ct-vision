import type {
    NotificationSource,
    CreateNotificationSourceInput,
    UpdateNotificationSourceInput

} from "./base.schemas"


export interface NotificationSourceRepository {
    findByCode(code: string): Promise<NotificationSource | null>

    findAll(): Promise<NotificationSource[]>


    create(input: CreateNotificationSourceInput): Promise<void>

    update(
        code: string,
        input: UpdateNotificationSourceInput
    ): Promise<void>

    delete(code: string): Promise<void>

    setDisabled(
        code: string,
        isDisabled: boolean
    ): Promise<void>
}



import type {
    NotificationEventType,
    CreateNotificationEventTypeInput,
    UpdateNotificationEventTypeInput

} from "./base.schemas"


export interface NotificationEventTypeRepository {
    findByCode(code: string): Promise<NotificationEventType | null>

    findAll(): Promise<NotificationEventType[]>

    create(input: CreateNotificationEventTypeInput): Promise<void>

    update(
        code: string,
        input: UpdateNotificationEventTypeInput
    ): Promise<void>

    delete(code: string): Promise<void>

    setDisabled(
        code: string,
        isDisabled: boolean
    ): Promise<void>
}
