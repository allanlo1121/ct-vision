
import type {
    NotificationRule,
    CreateNotificationRuleInput,
    UpdateNotificationRuleInput,
    FindNotificationRulesInput
} from "./schemas"


export interface NotificationRuleRepository {
    find(id: number): Promise<NotificationRule | null>
 

    findAll(): Promise<NotificationRule[]>

    // 根据事件查找接收人
    findRules(
        input: FindNotificationRulesInput
    ): Promise<NotificationRule[]>


    create(input: CreateNotificationRuleInput): Promise<void>

    update(
        id: number,
        input: UpdateNotificationRuleInput
    ): Promise<void>

    delete(id: number): Promise<void>

    setDisabled(
        id: number,
        isDisabled: boolean
    ): Promise<void>
}
