import { supabase } from "../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"
import {
  notificationRuleSchema,
  type NotificationRuleRepository,
  CreateNotificationRuleInput,
  NotificationRule
} from "@workspace/notification/rule"
import { getMatchingMinLevels } from "@workspace/shared/schemas";

export const notificationRuleRepository: NotificationRuleRepository = {
  async find(id: number) {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_rules")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? notificationRuleSchema.parse(data) : null
  },
  async findRules(input): Promise<NotificationRule[]> {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_rules")
      .select("*")
      .eq("source_type_code", input.source_type_code)
      .eq("event_type_code", input.event_type_code)
      .in("min_level", getMatchingMinLevels(input.level))
      .eq("is_disabled", false)
      .order("sort_order", { ascending: true })
    assertNoError(error)


    return data ? notificationRuleSchema.array().parse(data) : []
  },


  async findAll() {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_rules")
      .select("*")

    assertNoError(error)

    return notificationRuleSchema.array().parse(data) ?? []
  },
  async create(input: CreateNotificationRuleInput) {
    console.log("CreateNotificationRuleInput", input)
    const { data, error } = await supabase
      .schema("system")
      .from("notification_rules")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log(data, error)

    assertNoError(error)
  },
  async update(id, input) {
    const { error } = await supabase
      .schema("system")
      .from("notification_rules")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)
  },
  async delete(id) {
    const { error } = await supabase
      .schema("system")
      .from("notification_rules")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
  async setDisabled(id, isDisabled) {
    const { error } = await supabase
      .schema("system")
      .from("notification_rules")
      .update({ "is_disabled": isDisabled })
      .eq("id", id)

    assertNoError(error)
  }
}
