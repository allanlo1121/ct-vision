
import type { RealtimeChannel } from "@supabase/supabase-js"

import { supabase } from "../db/supabase"
import { tbmAssignmentEngine } from "./assignment/engine"
import { thresholdEngine } from "./threshold/engine"

export class TbmRealtimeSubscriber {
  private channel: RealtimeChannel | null = null

  private starting: Promise<void> | null = null

  private stopping = false

  // 同一个 Key 的刷新任务串行执行
  private refreshTasks = new Map<string, Promise<void>>()

  async start(): Promise<void> {
    if (this.starting) return this.starting
    if (this.channel) return

    this.stopping = false

    this.starting = this.subscribe()

    try {
      await this.starting
    } finally {
      this.starting = null
    }
  }

  private async subscribe(): Promise<void> {
    const channel = supabase
      .channel("tbm-context")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "tbm",
          table: "assignments",
        },
        (payload) => {
          const row =
            payload.eventType === "DELETE"
              ? payload.old
              : payload.new

          const tbmCode = row.tbm_code

          if (typeof tbmCode !== "string") {
            // 无法定位时，交由 Engine 做全量协调刷新
            void this.refresh("assignment:all", () =>
              tbmAssignmentEngine.refreshAll()
            )
            return
          }

          void this.refresh(`assignment:${tbmCode}`, () =>
            tbmAssignmentEngine.refresh(tbmCode)
          )
        }
      )

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "tbm",
          table: "tbm_parameter_threshold_rules",
        },
        (payload) => {
          const row =
            payload.eventType === "DELETE"
              ? payload.old
              : payload.new

          const tunnelId = row.tunnel_id

          if (typeof tunnelId !== "string") {
            // DELETE 可能无法携带 tunnel_id
            void this.refresh("threshold:all", () =>
              thresholdEngine.start()
            )
            return
          }

          void this.refresh(`threshold:${tunnelId}`, () =>
            thresholdEngine.refreshByTunnelId(tunnelId)
          )
        }
      )

    this.channel = channel

    try {
      await new Promise<void>((resolve, reject) => {
        let subscribedOnce = false

        channel.subscribe((status, error) => {
          if (status === "SUBSCRIBED") {
            if (subscribedOnce) {
              // 重连后补偿同步
              void this.refresh("context:resync", async () => {
                await tbmAssignmentEngine.refreshAll()
                await thresholdEngine.start()
              })
            }

            subscribedOnce = true
            resolve()
          }

          if (
            status === "CHANNEL_ERROR" ||
            status === "TIMED_OUT" ||
            status === "CLOSED"
          ) {
            console.error(
              "[TbmRealtimeSubscriber] subscription error",
              status,
              error
            )

            if (!subscribedOnce) {
              reject(error ?? new Error(status))
            }
          }
        })
      })

      console.log("[TbmRealtimeSubscriber] subscribed")
    } catch (error) {
      this.channel = null
      await supabase.removeChannel(channel)
      throw error
    }
  }

  /**
   * 同 Key 串行刷新
   */
  private refresh(
    key: string,
    callback: () => Promise<void>
  ): Promise<void> {
    const previous =
      this.refreshTasks.get(key) ?? Promise.resolve()

    const task = previous
      .catch(() => {})
      .then(async () => {
        if (this.stopping) return

        try {
          await callback()
        } catch (error) {
          console.error(
            `[TbmRealtimeSubscriber] ${key} refresh failed`,
            error
          )
        }
      })

    this.refreshTasks.set(key, task)

    void task.finally(() => {
      if (this.refreshTasks.get(key) === task) {
        this.refreshTasks.delete(key)
      }
    })

    return task
  }

  async stop(): Promise<void> {
    this.stopping = true

    if (this.starting) {
      try {
        await this.starting
      } catch {
        // 启动失败时已处理
      }
    }

    const channel = this.channel
    this.channel = null

    if (channel) {
      await supabase.removeChannel(channel)
    }

    await Promise.allSettled(this.refreshTasks.values())
    this.refreshTasks.clear()

    console.log("[TbmRealtimeSubscriber] stopped")
  }
}

export const tbmRealtimeSubscriber =
  new TbmRealtimeSubscriber()
