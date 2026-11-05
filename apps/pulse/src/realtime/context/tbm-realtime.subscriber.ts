// realtime/tbm-realtime.subscriber.ts

import type { RealtimeChannel } from "@supabase/supabase-js"

import { supabase } from "../../db/supabase"
import { tbmAssignmentEngine } from "../tbm-assignment/engine.back"
// import { riskEngine } from "../tbm-risk/engine"
// import { thresholdEngine } from "../tbm-parameter/engine"

export class TbmRealtimeSubscriber {
  private channel: RealtimeChannel | null = null

  private starting: Promise<void> | null = null

  async start(): Promise<void> {
    if (this.channel) return
    if (this.starting) return this.starting

    this.starting = this.subscribe()

    try {
      await this.starting
    } finally {
      this.starting = null
    }
  }

  private async subscribe(): Promise<void> {
    const channel = supabase
      .channel("tbm-config")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "tbm",
          table: "assignments",
        },
        () => {
          console.log("[TbmRealtimeSubscriber] assignment change detected")
          void this.refresh("assignment", () =>
            tbmAssignmentEngine.refreshAll()
          )
        }
      )

    // .on(
    //   "postgres_changes",
    //   {
    //     event: "*",
    //     schema: "proj",
    //     table: "tunnel_risks",
    //   },
    //   () => {
    //     void this.refresh("risk", () =>
    //       riskEngine.refreshAll()
    //     )
    //   }
    // )

    // .on(
    //   "postgres_changes",
    //   {
    //     event: "*",
    //     schema: "tbm",
    //     table: "tbm_parameters",
    //   },
    //   () => {
    //     void this.refresh("threshold", () =>
    //       thresholdEngine.refreshAll()
    //     )
    //   }
    // )

    this.channel = channel

    try {
      await new Promise<void>((resolve, reject) => {
        channel.subscribe((status, error) => {
          if (status === "SUBSCRIBED") {
            resolve()
          }

          if (
            status === "CHANNEL_ERROR" ||
            status === "TIMED_OUT" ||
            status === "CLOSED"
          ) {
            reject(error ?? new Error(`Realtime subscription: ${status}`))
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

  private async refresh(
    name: string,
    callback: () => Promise<void>
  ): Promise<void> {
    try {
      await callback()
    } catch (error) {
      console.error(`[TbmRealtimeSubscriber] ${name} refresh failed`, error)
    }
  }

  async stop(): Promise<void> {
    if (this.starting) {
      try {
        await this.starting
      } catch {
        // 启动失败已在 subscribe() 内处理
      }
    }

    if (!this.channel) return

    const channel = this.channel
    this.channel = null

    await supabase.removeChannel(channel)

    console.log("[TbmRealtimeSubscriber] stopped")
  }
}

export const tbmRealtimeSubscriber = new TbmRealtimeSubscriber()
