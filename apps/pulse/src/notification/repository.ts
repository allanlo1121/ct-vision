import { supabase } from "../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"
import {
  type NotificationEventRepository,
  CreateNotificationEventInput,
} from "@workspace/notification"

export const notificationEventRepository: Pick<
  NotificationEventRepository,
  "create"
> = {

  async create(input: CreateNotificationEventInput) {
    // console.log("CreateNotificationEventInput", input)
    const { data, error } = await supabase
      .schema("system")
      .from("notification_events")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log(data, error)

    assertNoError(error)
  }

}
