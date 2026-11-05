
import type {
    NotificationTemplate,
    CreateNotificationTemplateInput,
    UpdateNotificationTemplateInput

} from "./template.schemas"
import { NotificationChannel } from "@workspace/shared"

export interface NotificationTemplateRepository {
    find(id: number): Promise<NotificationTemplate | null>

    findByChannel(
        channel: NotificationChannel
    ): Promise<NotificationTemplate[]>

    findAll(): Promise<NotificationTemplate[]>

    create(input: CreateNotificationTemplateInput): Promise<void>

    update(
        id: number,
        input: UpdateNotificationTemplateInput
    ): Promise<void>

    delete(id: number): Promise<void>

    setDisabled(
        id: number,
        isDisabled: boolean
    ): Promise<void>
}


