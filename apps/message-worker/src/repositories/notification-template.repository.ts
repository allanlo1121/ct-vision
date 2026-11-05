import { supabase } from "../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"
import {
  notificationTemplateSchema,
  type NotificationTemplateRepository,
  CreateNotificationTemplateInput,
  NotificationTemplate
} from "@workspace/notification/rule"

export const notificationTemplateRepository: NotificationTemplateRepository = {
  async find(id: number) {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_templates")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? notificationTemplateSchema.parse(data) : null
  },
  async findByChannel(channel): Promise<NotificationTemplate[]> {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_templates")
      .select("*")
      .eq("channel", channel)
    assertNoError(error)


    return data ? notificationTemplateSchema.array().parse(data) : []
  },


  async findAll() {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_templates")
      .select("*")

    assertNoError(error)

    return notificationTemplateSchema.array().parse(data) ?? []
  },
  async create(input: CreateNotificationTemplateInput) {
    console.log("CreateNotificationTemplateInput", input)
    const { data, error } = await supabase
      .schema("system")
      .from("notification_templates")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log(data, error)

    assertNoError(error)
  },
  async update(id, input) {
    const { error } = await supabase
      .schema("system")
      .from("notification_templates")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)
  },
  async delete(id) {
    const { error } = await supabase
      .schema("system")
      .from("notification_templates")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
  async setDisabled(id, isDisabled) {
    const { error } = await supabase
      .schema("system")
      .from("notification_templates")
      .update({ "is_disabled": isDisabled })
      .eq("id", id)

    assertNoError(error)
  }
}
