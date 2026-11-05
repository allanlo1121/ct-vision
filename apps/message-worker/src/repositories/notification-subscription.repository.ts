import { supabase } from "../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"
import {
  notificationSubscriptionSchema,
  type NotificationSubscriptionRepository,
  CreateNotificationSubscriptionInput,
  NotificationSubscription
} from "@workspace/notification/rule"
import { getMatchingMinLevels } from "@workspace/shared/schemas";

export const notificationSubcriptionRepository: NotificationSubscriptionRepository = {
  async find(id: number) {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_subscriptions")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? notificationSubscriptionSchema.parse(data) : null
  },
  async findByEmployeeId(
    employeeId: string
  ): Promise<NotificationSubscription[]> {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_subscriptions")
      .select("*")
      .eq("employee_id", employeeId)
      .maybeSingle()

    assertNoError(error)

    return data ? notificationSubscriptionSchema.array().parse(data) : []
  },

  async findRecipients(input): Promise<NotificationSubscription[]> {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_subscriptions")
      .select("*")
      .eq("source_type_code", input.source_type_code)
      .eq("event_type_code", input.event_type_code)
      .eq("organization_id", input.organization_id)
      .in("min_level", getMatchingMinLevels(input.level))
      .eq("is_disabled", false)
    assertNoError(error)


    return data ? notificationSubscriptionSchema.array().parse(data) : []
  },


  async findAll() {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_subscriptions")
      .select("*")

    assertNoError(error)

    return notificationSubscriptionSchema.array().parse(data) ?? []
  },
  async create(input: CreateNotificationSubscriptionInput) {
    console.log("CreateNotificationSubcriptionInput", input)
    const { data, error } = await supabase
      .schema("system")
      .from("notification_subscriptions")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log(data, error)

    assertNoError(error)
  },
  async update(id, input) {
    const { error } = await supabase
      .schema("system")
      .from("notification_subscriptions")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)
  },
  async delete(id) {
    const { error } = await supabase
      .schema("system")
      .from("notification_subscriptions")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
  async setDisabled(id, isDisabled) {
    const { error } = await supabase
      .schema("system")
      .from("notification_subscriptions")
      .update({ "is_disabled": isDisabled })
      .eq("id", id)

    assertNoError(error)
  }
}
