
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

  // ========================================
  // 启动
  // ========================================

  async start(): Promise<void> {
    if (this.stopping) return

    if (this.starting) {
      return this.starting
    }

    if (this.channel) {
      return
    }

    this.starting = this.subscribe()

    try {
      await this.starting
    } finally {
      this.starting = null
    }
  }

  // ========================================
  // 创建  Channel
  // ========================================
  private createChannel(): RealtimeChannel {
    return supabase
      .channel("tbm-context")

      // 1. TBM 任务分配
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "tbm",
          table: "assignments",
        },
        (payload) => {
          if (this.stopping) return

          console.log("[Pulse Realtime] Assignment changed", {
            eventType: payload.eventType,
            new: payload.new,
            old: payload.old,
          })

          const row =
            payload.eventType === "DELETE"
              ? payload.old
              : payload.new

          const tbmCode = row.tbm_code

          if (typeof tbmCode !== "string") {
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

      // 2. 专用阈值
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "tbm",
          table: "parameter_thresholds",
        },
        (payload) => {
          if (this.stopping) return

          console.log("[Pulse Realtime] Threshold changed", {
            eventType: payload.eventType,
            new: payload.new,
            old: payload.old,
          })

          const row =
            payload.eventType === "DELETE"
              ? payload.old
              : payload.new

          const tunnelId = row.tunnel_id

          if (typeof tunnelId !== "string") {
            void this.refresh("threshold", () =>
              thresholdEngine.start()
            )
            return
          }

          void this.refresh("threshold", () =>
            thresholdEngine.refreshByTunnelId(tunnelId)
          )
        }
      )

      // 3. 通用阈值
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "tbm",
          table: "parameter_threshold_defaults",
        },
        (payload) => {
          if (this.stopping) return

          console.log("[Pulse Realtime] Default Threshold changed", {
            eventType: payload.eventType,
            new: payload.new,
            old: payload.old,
          })

          void this.refresh("threshold", () =>
            thresholdEngine.start()
          )
        }
      )
  }

  // ========================================
  // 订阅单个 Channel
  // ========================================

  private subscribeChannel(
    channel: RealtimeChannel,
    name: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let subscribedOnce = false

      channel.subscribe((status, error) => {
        if (status === "SUBSCRIBED") {
          if (!subscribedOnce) {
            subscribedOnce = true

            console.log(
              `[TbmRealtimeSubscriber] ${name} subscribed`
            )

            resolve()
            return
          }

          if (this.stopping) return

          // 重连后补偿同步
          void this.refresh("assignment", () =>
            tbmAssignmentEngine.refreshAll()
          )

          void this.refresh("threshold", () =>
            thresholdEngine.start()
          )
          return
        }

        if (
          status === "CHANNEL_ERROR" ||
          status === "TIMED_OUT" ||
          status === "CLOSED"
        ) {
          console.error(
            `[TbmRealtimeSubscriber] ${name} subscription error`,
            status,
            error
          )

          if (!subscribedOnce) {
            reject(error ?? new Error(`${name}: ${status}`))
          }
        }
      })
    })
  }

  // ========================================
  // 启动订阅
  // ========================================

  private async subscribe(): Promise<void> {
    const channel = this.createChannel()

    this.channel = channel

    try {
      await this.subscribeChannel(channel, "TBM Context")

      console.log(
        "[TbmRealtimeSubscriber] all subscriptions ready"
      )
    } catch (error) {
      this.channel = null

      await supabase.removeChannel(channel)

      throw error
    }
  }
  // ========================================
  // 同 Key 串行刷新
  // ========================================

  private refresh(
    key: string,
    callback: () => Promise<void>
  ): Promise<void> {
    const previous =
      this.refreshTasks.get(key) ?? Promise.resolve()

    const task = previous
      .catch(() => { })
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

  // ========================================
  // 停止订阅
  // ========================================

  async stop(): Promise<void> {
    this.stopping = true

    if (this.starting) {
      try {
        await this.starting
      } catch {
        // 启动失败时已清理
      }
    }

    if (this.channel) {
      await supabase.removeChannel(this.channel)
      this.channel = null
    }


    await Promise.allSettled(
      this.refreshTasks.values()
    )

    this.refreshTasks.clear()

    console.log("[TbmRealtimeSubscriber] stopped")

    this.stopping = false
  }
}

export const tbmRealtimeSubscriber =
  new TbmRealtimeSubscriber()

