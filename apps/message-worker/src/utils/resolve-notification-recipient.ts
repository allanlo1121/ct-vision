import type { NotificationChannel } from "@workspace/shared"
import type { EmployeeContact } from "@workspace/hrm/employee"

export interface NotificationRecipient {
    employee_id: string
    channel: NotificationChannel
    recipient: string
}

export function resolveNotificationRecipients(
    employees: EmployeeContact[],
    channel: NotificationChannel
): NotificationRecipient[] {
    const recipients = employees.flatMap((employee) => {
        const address = {
            sms: employee.mobile,
            wecom: employee.code,
            in_app: employee.email,
        }[channel]?.trim()

        if (!address) return []

        return [{
            employee_id: employee.employee_id,
            channel,
            recipient: address,
        }]
    })

    // 同一渠道、同一接收地址去重
    return Array.from(
        new Map(
            recipients.map((item) => [
                `${item.channel}:${item.recipient}`,
                item,
            ])
        ).values()
    )
}