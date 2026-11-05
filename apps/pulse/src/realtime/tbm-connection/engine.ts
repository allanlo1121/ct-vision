

import { TbmConnectionStateStore } from "./store"
import type { ITbmConnectionStateRepository } from "./repository"
import { ConnectionType } from "./types"

export class TbmConnectionStateEngine {
    private started = false

    constructor(
        private repository: ITbmConnectionStateRepository,
        private store: TbmConnectionStateStore,
    ) { }

    async start(): Promise<void> {
        if (this.started) {
            return
        }
        await this.loadInitial()

        this.started = true
    }

    private async loadInitial(): Promise<void> {
        const assignments =
            await this.repository.getAll()

        this.store.replace(assignments)
    }

    async markOnline(
        tbmCode: string,
        type: ConnectionType,
        lastSeen: string
    ): Promise<void> {
        // 先更新内存
        this.store.updateOnline(
            tbmCode,
            type,
            lastSeen
        )

        // 再持久化
        await this.repository.markOnline(
            tbmCode,
            type,
            lastSeen
        )
    }

    async markOffline(
        tbmCode: string,
        type: ConnectionType
    ): Promise<void> {
        this.store.updateOffline(
            tbmCode,
            type
        )

        await this.repository.markOffline(
            tbmCode,
            type
        )
    }

    // private async refresh(
    //     tbmCode: string
    // ): Promise<void> {
    //     const connectionState =
    //         await this.repository.get(tbmCode)

    //     if (!assignment) {
    //         this.store.remove(tbmCode)
    //         return
    //     }

    //     this.store.upsert(assignment)
    // }
}