import type { ConnectionType, TbmConnectionState } from "../tbm-connection"

import type { TbmAssignmentCurrentRow } from "@workspace/tbm/tbm"
import type { TbmOperatingStatus } from "@workspace/tbm/runtime"
import type { TbmParameterThresholdRules } from "../parameter-threshold/types"
import type { TbmRealtimeContext } from "./types"

type ContextPatch = {
  assignment?: TbmAssignmentCurrentRow
  runtime?: Partial<TbmRealtimeContext["runtime"]>
  rules?: Partial<TbmRealtimeContext["rules"]>
}

type ContextListener = (tbmCode: string) => void

export class TbmRealtimeContextStore {
  private map = new Map<string, TbmRealtimeContext>()

  private listeners = new Set<ContextListener>()

  // ========================================
  // 查询
  // ========================================

  get(tbmCode: string): TbmRealtimeContext | undefined {
    return this.map.get(tbmCode)
  }

  getByTunnelId(tunnelId: string): TbmRealtimeContext | undefined {
    for (const context of this.map.values()) {
      if (context.assignment.tunnel_id === tunnelId) {
        return context
      }
    }

    return undefined
  }

  has(tbmCode: string): boolean {
    return this.map.has(tbmCode)
  }

  values(): TbmRealtimeContext[] {
    return [...this.map.values()]
  }

  get size(): number {
    return this.map.size
  }

  // ========================================
  // 基础操作
  // ========================================

  /**
   * 新增或整体覆盖一台 TBM Context
   */
  set(tbmCode: string, context: TbmRealtimeContext): void {
    if (context.assignment.tbm_code !== tbmCode) {
      throw new Error("TBM code mismatch")
    }

    this.map.set(tbmCode, context)
    this.emit(tbmCode)
  }

  /**
   * 局部更新 Context
   * runtime / rules 使用嵌套浅合并
   */
  update(tbmCode: string, patch: ContextPatch): boolean {
    const current = this.map.get(tbmCode)

    if (!current) return false

    if (patch.assignment && patch.assignment.tbm_code !== tbmCode) {
      throw new Error("TBM code mismatch")
    }

    const next: TbmRealtimeContext = {
      ...current,
      ...patch,
      runtime: {
        ...current.runtime,
        ...patch.runtime,
      },
      rules: {
        ...current.rules,
        ...patch.rules,
      },
    }

    this.map.set(tbmCode, next)
    this.emit(tbmCode)

    return true
  }

  /**
   * 启动时全量替换
   */
  replace(contexts: TbmRealtimeContext[]): void {
    const next = new Map<string, TbmRealtimeContext>()

    for (const context of contexts) {
      next.set(context.assignment.tbm_code!, context)
    }

    this.map = next
    this.emit("*")
  }

  remove(tbmCode: string): boolean {
    const deleted = this.map.delete(tbmCode)

    if (deleted) {
      this.emit(tbmCode)
    }

    return deleted
  }

  clear(): void {
    this.map.clear()
    this.emit("*")
  }

  // ========================================
  // Assignment
  // ========================================

  updateAssignment(
    tbmCode: string,
    assignment: TbmAssignmentCurrentRow
  ): boolean {
    return this.update(tbmCode, {
      assignment,
    })
  }

  // ========================================
  // Runtime
  // ========================================

  updateOperatingStatus(
    tbmCode: string,
    operatingStatus: TbmOperatingStatus | null
  ): boolean {
    return this.update(tbmCode, {
      runtime: {
        operatingStatus,
      },
    })
  }

  updateConnectionState(
    tbmCode: string,
    connectionState: TbmConnectionState | null
  ): boolean {
    return this.update(tbmCode, {
      runtime: {
        connectionState,
      },
    })
  }

  /**
   * 更新在线状态
   */
  updateOnline(
    tbmCode: string,
    type: ConnectionType,
    lastSeen: string
  ): boolean {
    const context = this.map.get(tbmCode)

    if (!context) return false

    const current = context.runtime.connectionState

    const connectionState: TbmConnectionState = current ?? {
      tbmCode,
      isHeartbeatOnline: false,
      isRealdataOnline: false,
      lastHeartbeatAt: null,
      lastRealdataAt: null,
    }

    const next: TbmConnectionState = {
      ...connectionState,
      ...(type === "heartbeat"
        ? {
            isHeartbeatOnline: true,
            lastHeartbeatAt: lastSeen,
          }
        : {
            isRealdataOnline: true,
            lastRealdataAt: lastSeen,
          }),
    }

    return this.updateConnectionState(tbmCode, next)
  }

  /**
   * 更新离线状态
   */
  updateOffline(tbmCode: string, type: ConnectionType): boolean {
    const context = this.map.get(tbmCode)

    if (!context) return false

    const current = context.runtime.connectionState

    const connectionState: TbmConnectionState = current ?? {
      tbmCode,
      isHeartbeatOnline: false,
      isRealdataOnline: false,
      lastHeartbeatAt: null,
      lastRealdataAt: null,
    }

    const next: TbmConnectionState = {
      ...connectionState,
      ...(type === "heartbeat"
        ? { isHeartbeatOnline: false }
        : { isRealdataOnline: false }),
    }

    return this.updateConnectionState(tbmCode, next)
  }

  // ========================================
  // Rules
  // ========================================

  /**
   * 整体替换一台 TBM 的参数阈值规则
   */
  updateThresholdRules(
    tbmCode: string,
    parameterThresholds: TbmParameterThresholdRules
  ): boolean {
    return this.update(tbmCode, {
      rules: {
        parameterThresholds,
      },
    })
  }

  // ========================================
  // Subscribe
  // ========================================

  subscribe(callback: ContextListener): () => void {
    this.listeners.add(callback)

    return () => {
      this.listeners.delete(callback)
    }
  }

  private emit(tbmCode: string): void {
    for (const listener of this.listeners) {
      try {
        listener(tbmCode)
      } catch (error) {
        console.error("[TbmRealtimeContextStore] listener error", error)
      }
    }
  }
}

export const tbmRealtimeContextStore = new TbmRealtimeContextStore()
