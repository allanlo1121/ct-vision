import { supabase } from "../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"
import {
  notificationOutboxSchema,
  type NotificationOutboxRepository,
  CreateNotificationOutboxInput,
  NotificationOutbox
} from "@workspace/notification/outbox"

export const notificationOutboxRepository: NotificationOutboxRepository = {
  async findById(id: number): Promise<NotificationOutbox | null> {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_outbox")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? notificationOutboxSchema.parse(data) : null
  },

  // 批量入队，忽略重复消息
  async enqueue(
    inputs: CreateNotificationOutboxInput[]
  ): Promise<void> {
    console.log("start enqueue outbox",inputs)
    if (inputs.length === 0) return

    const { error } = await supabase
      .schema("system")
      .from("notification_outbox")
      .upsert(inputs, {
        onConflict: "dedup_key",
        ignoreDuplicates: true,
      })

    assertNoError(error)
  },

  // 原子领取待发送消息
  async claimPending(limit: number): Promise<NotificationOutbox[]> {
    if (limit <= 0) return []

    const { data, error } = await supabase
      .schema("system")
      .rpc("claim_notification_outbox", {
        p_limit: limit,
      })

    assertNoError(error)

    return notificationOutboxSchema.array().parse(data ?? [])
  },

  // 标记发送成功
  async markSent(
    id: number,
    providerMessageId: string | null
  ): Promise<void> {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_outbox")
      .update({
        status: "sent",
        sent_at: new Date().toISOString(),
        processing_at: null,
        next_retry_at: null,
        last_error: null,
        provider_message_id: providerMessageId ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("status", "processing")
      .select("id")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new Error(`通知任务 ${id} 不存在或不处于发送中状态`)
    }
  },

  // 发送失败，安排下一次重试
  async markRetry(
    id: number,
    message: string,
    nextRetryAt: string
  ): Promise<void> {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_outbox")
      .update({
        status: "pending",
        next_retry_at: nextRetryAt,
        last_error: message,
        processing_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("status", "processing")
      .select("id")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new Error(`通知任务 ${id} 不存在或不处于发送中状态`)
    }
  },

  // 标记最终失败
  async markFailed(
    id: number,
    message: string
  ): Promise<void> {
    const { data, error } = await supabase
      .schema("system")
      .from("notification_outbox")
      .update({
        status: "failed",
        last_error: message,
        processing_at: null,
        next_retry_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("status", "processing")
      .select("id")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new Error(`通知任务 ${id} 不存在或不处于发送中状态`)
    }
  },
}
