
import type { ConnectionType } from "./types"
import type { TbmConnectionState } from "./types"

export class TbmConnectionStateStore {
    private data = new Map<string, TbmConnectionState>()

    private listeners = new Set<(id: string) => void>()

    /**
     * MQTT 主入口
     */
    get(tbmCode: string): TbmConnectionState | undefined {
        return this.data.get(tbmCode)
    }


    /**
     * 新增或更新
     */
    upsert(ConTbmConnectionState: TbmConnectionState): void {
        const previous = this.data.get(ConTbmConnectionState.tbmCode)

        // tbmCode 发生变化时清理旧索引
        if (
            previous &&
            previous.tbmCode !== ConTbmConnectionState.tbmCode
        ) {
            this.data.delete(previous.tbmCode)
        }

        this.data.set(ConTbmConnectionState.tbmCode, ConTbmConnectionState)

        this.emit(ConTbmConnectionState.tbmCode)
    }

    /**
     * 启动时全量替换
     */
    replace(ConTbmConnectionStates: TbmConnectionState[]): void {
        const data = new Map<string, TbmConnectionState>()

        for (const ConTbmConnectionState of ConTbmConnectionStates) {
            data.set(ConTbmConnectionState.tbmCode, ConTbmConnectionState)
        }

        this.data = data
        console.log("TbmConnectionStateStore replaced with", data)
        this.emit("*")
    }

    /**
     * 根据 tbmCode 删除
     */
    remove(tbmCode: string): boolean {
        const ConTbmConnectionState = this.data.get(tbmCode)

        if (!ConTbmConnectionState) {
            return false
        }

        this.data.delete(tbmCode)

        this.emit(tbmCode)
        return true
    }


    updateOnline(
        tbmCode: string,
        type: ConnectionType,
        lastSeen: string
    ): void {
        const state = this.data.get(tbmCode)

        if (type === "heartbeat") {
            this.data.set(tbmCode, {
                tbmCode,
                isHeartbeatOnline: true,
                isRealdataOnline:
                    state?.isRealdataOnline ?? false,
                lastHeartbeatAt: lastSeen,
                lastRealdataAt:
                    state?.lastRealdataAt ?? null,
            })
        } else if (type === "realdata") {
            this.data.set(tbmCode, {
                tbmCode,
                isHeartbeatOnline:
                    state?.isHeartbeatOnline ?? false,
                isRealdataOnline: true,
                lastHeartbeatAt:
                    state?.lastHeartbeatAt ?? null,
                lastRealdataAt: lastSeen,
            })
        }
    }



    updateOffline(
        tbmCode: string,
        type: ConnectionType
    ): void {
        const state = this.data.get(tbmCode)

        if (!state) {
            return
        }

        if (type === "heartbeat") {
            this.data.set(tbmCode, {
                ...state,
                isHeartbeatOnline: false,
            })
        } else if (type === "realdata") {
            this.data.set(tbmCode, {
                ...state,
                isRealdataOnline: false,
            })
        }
    }

    subscribe(callback: (code: string) => void) {
        this.listeners.add(callback)

        return () => {
            this.listeners.delete(callback)
        }
    }

    private emit(code: string) {
        for (const fn of this.listeners) {
            fn(code)
        }
    }

    hasCode(tbmCode: string): boolean {
        return this.data.has(tbmCode)
    }


    list(): TbmConnectionState[] {
        return [...this.data.values()]
    }

    get size(): number {
        return this.data.size
    }

    clear(): void {
        this.data.clear()
    }
}

export const tbmConTbmConnectionStateStore = new TbmConnectionStateStore()