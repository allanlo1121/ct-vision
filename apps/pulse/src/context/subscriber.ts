
import type { RealtimeChannel } from "@supabase/supabase-js"

import { supabase } from "../db/supabase"
import { tbmAssignmentEngine } from "./assignment/engine"
import { thresholdEngine } from "./threshold/engine"



export class TbmRealtimeSubscriber {
  private channels: RealtimeChannel[] = []

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

    if (this.channels.length > 0) {
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
  // 创建 Assignment Channel
  // ========================================

  private createAssignmentChannel(): RealtimeChannel {
    return supabase
      .channel("tbm-assignments")
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
            // DELETE 可能无法获取 tbm_code
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
  }

  // ========================================
  // 创建 Threshold Channel
  // ========================================

  private createThresholdChannel(): RealtimeChannel {
    return supabase
      .channel("tbm-threshold-rules")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "tbm",
          table: "tbm_parameter_threshold_rules",
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
            // 无法定位隧道，全量刷新阈值
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
        if (this.stopping) return

        if (status === "SUBSCRIBED") {
          console.log(
            `[TbmRealtimeSubscriber] ${name} subscribed`
          )

          if (subscribedOnce) {
            // 连接恢复后补偿同步
            void this.refresh("context:resync", async () => {
              await tbmAssignmentEngine.refreshAll()
              await thresholdEngine.start()
            })
          }

          subscribedOnce = true
          resolve()
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
  // 启动全部订阅
  // ========================================

  private async subscribe(): Promise<void> {
    const assignmentChannel =
      this.createAssignmentChannel()

    const thresholdChannel =
      this.createThresholdChannel()

    this.channels = [
      assignmentChannel,
      thresholdChannel,
    ]

    try {
      await Promise.all([
        this.subscribeChannel(
          assignmentChannel,
          "Assignment"
        ),

        this.subscribeChannel(
          thresholdChannel,
          "Threshold"
        ),
      ])

      console.log(
        "[TbmRealtimeSubscriber] all channels subscribed"
      )
    } catch (error) {
      const channels = this.channels
      this.channels = []

      await Promise.allSettled(
        channels.map((channel) =>
          supabase.removeChannel(channel)
        )
      )

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

    const channels = this.channels
    this.channels = []

    await Promise.allSettled(
      channels.map((channel) =>
        supabase.removeChannel(channel)
      )
    )

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

