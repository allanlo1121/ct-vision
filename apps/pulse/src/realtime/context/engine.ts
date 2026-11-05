
// import {
//   tbmAssignmentEngine,
//   TbmAssignmentEngine,
// } from "../tbm-assignment/engine.back"

// import {
//   tbmOperatingStatusEngine,
//   TbmOperatingStatusEngine,
// } from "../tbm-operating-status/engine"

// import {
//   tbmConnectionEngine,
//   TbmConnectionEngine,
// } from "../tbm-connection/engine"

// import {
//   parameterThresholdEngine,
//   ParameterThresholdEngine,
// } from "../parameter-threshold/engine"

// import {
//   tbmRealtimeSubscriber,
//   TbmRealtimeSubscriber,
// } from "./tbm-realtime.subscriber"

// export class TbmContextManager {
//   private started = false

//   constructor(
//     private readonly assignmentEngine: TbmAssignmentEngine,
//     private readonly operatingStatusEngine: TbmOperatingStatusEngine,
//     private readonly connectionEngine: TbmConnectionEngine,
//     private readonly thresholdEngine: ParameterThresholdEngine,
//     private readonly subscriber: TbmRealtimeSubscriber
//   ) {}

//   async start(): Promise<void> {
//     if (this.started) return

//     try {
//       // 1. 建立 Realtime 订阅
//       await this.subscriber.start()

//       // 2. 创建 TBM Context
//       await this.assignmentEngine.start()

//       // 3. 初始化 Runtime
//       await Promise.all([
//         this.operatingStatusEngine.start(),
//         this.connectionEngine.start(),
//       ])

//       // 4. 初始化参数阈值规则
//       await this.thresholdEngine.start()

//       this.started = true

//       console.log("[TbmContextManager] started")
//     } catch (error) {
//       await this.stop()
//       throw error
//     }
//   }

//   async stop(): Promise<void> {
//     this.started = false
//     await this.subscriber.stop()
//     console.log("[TbmContextManager] stopped")
//   }
// }

// export const tbmContextManager = new TbmContextManager(
//   tbmAssignmentEngine,
//   tbmOperatingStatusEngine,
//   tbmConnectionEngine,
//   parameterThresholdEngine,
//   tbmRealtimeSubscriber
// )
