import { supabase } from "../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"
import {
  notificationAttemptSchema,
  type NotificationAttemptRepository,
  CreateNotificationAttemptInput,
  NotificationAttempt
} from "@workspace/notification/outbox"

export const notificationAttemptRepository: NotificationAttemptRepository = {
  async findById(id: number): Promise<NotificationAttempt | null> {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_attempts")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? notificationAttemptSchema.parse(data) : null
  },

  // 批量入队，忽略重复消息
  async create(
    input: CreateNotificationAttemptInput
  ): Promise<void> {

    const { error } = await supabase
      .schema("system")
      .from("notification_attempts")
      .insert(input)

    assertNoError(error)
  },

  // 原子领取待发送消息
  async findByOutboxId(outboxId: number): Promise<NotificationAttempt[]> {


    const { data, error } = await supabase
      .schema("system")
      .from("notification_attempts")
      .select("*")
      .eq("outbox_id", outboxId)

    assertNoError(error)

    return notificationAttemptSchema.array().parse(data ?? [])
  },


}
