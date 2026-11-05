import { connectionStatusRepository } from "./repository"
import { tbmRealtimeContextStore } from "../context/store"

export class ConnectionStatusEngine {
  async start(): Promise<void> {
    const tbmCodes = tbmRealtimeContextStore
      .values()
      .map((context) => context.assignment.tbm_code!)

    if (tbmCodes.length === 0) return

    const statusByTbm =
      await connectionStatusRepository.findByTbmCodes(tbmCodes)

    const statusMap = new Map(
      statusByTbm.map((status) => [status.tbm_code, status])
    )

    for (const tbmCode of tbmCodes) {
      tbmRealtimeContextStore.updateConnectionStatus(
        tbmCode,
        statusMap.get(tbmCode) ?? null
      )
    }
  }
}

export const connectionStatusEngine = new ConnectionStatusEngine()
