import { tbmAssignmentEngine, TbmAssignmentEngine } from "./assignment/engine"

import { thresholdEngine, ThresholdEngine } from "./threshold/engine"

import { tbmRealtimeSubscriber, TbmRealtimeSubscriber } from "./subscriber"

export class TbmContextManager {
  private started = false

  constructor(
    private readonly assignmentEngine: TbmAssignmentEngine,
    private readonly thresholdEngine: ThresholdEngine,
    private readonly subscriber: TbmRealtimeSubscriber
  ) {}

  async start(): Promise<void> {
    if (this.started) return

    try {
      // 1. 建立 Realtime 订阅
      await this.subscriber.start()

      // 2. 创建 TBM Context
      await this.assignmentEngine.start()

      // 4. 初始化参数阈值规则
      await this.thresholdEngine.start()

      this.started = true

      console.log("[TbmContextManager] started")

    } catch (error) {
      await this.stop()
      throw error
    }
  }

  async stop(): Promise<void> {
    this.started = false
    await this.subscriber.stop()
    console.log("[TbmContextManager] stopped")
  }
}

export const tbmContextManager = new TbmContextManager(
  tbmAssignmentEngine,
  thresholdEngine,
  tbmRealtimeSubscriber
)
