import { supabase } from "../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"
import {
  notificationEventSchema,
  type NotificationEventRepository,
  CreateNotificationEventInput,
  NotificationEvent,
  NotificationTaskInput
} from "@workspace/notification"

export const notificationEventRepository: NotificationEventRepository = {

  async findPending(limit = 100): Promise<NotificationEvent[]> {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_events")
      .select("*")
      .is("processed_at", null)
      .lt("retry_count", 5)
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .limit(limit)

    assertNoError(error)
    // console.log("notify findPending", data, error)

    return data ? notificationEventSchema.array().parse(data) : []
  },

  async markProcessed(eventId: number): Promise<void> {
    const { error } = await supabase
      .schema("system")
      .from("notification_events")
      .update({
        processed_at: new Date().toISOString(),
        processing_error: null,
      })
      .eq("id", eventId)

    assertNoError(error)
  },

  // async completeDispatch(
  //   eventId: number,
  //   tasks: NotificationTaskInput[]
  // ): Promise<boolean> {
  //   const { data, error } = await supabase
  //     .schema("system")
  //     .rpc("dispatch_notification_event", {
  //       p_event_id: eventId,
  //       p_tasks: tasks,
  //     })

  //   assertNoError(error)

  //   return data === true
  // },

  async recordFailure(eventId: number, message: string): Promise<void> {
    const { error } = await supabase
      .schema("system")
      .rpc("fail_notification_event", {
        p_event_id: eventId,
        p_error: message,
      })

    assertNoError(error)
  },



  async create(input: CreateNotificationEventInput) {
    console.log("CreateNotificationEventInput", input)
    const { data, error } = await supabase
      .schema("system")
      .from("notification_events")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log(data, error)

    assertNoError(error)
  },

}
