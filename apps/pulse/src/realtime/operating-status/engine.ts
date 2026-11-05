import { operatingStatusRepository } from "./repository"
import { tbmRealtimeContextStore } from "../context/store"

export class OperatingStatusEngine {
  async start(): Promise<void> {
    const tbmCodes = tbmRealtimeContextStore
      .values()
      .map((context) => context.assignment.tbm_code!)

    if (tbmCodes.length === 0) return

    const statusByTbm = await operatingStatusRepository.findByTbmCodes(tbmCodes)

    const statusMap = new Map(
      statusByTbm.map((status) => [status.tbm_code, status])
    )

    for (const tbmCode of tbmCodes) {
      tbmRealtimeContextStore.updateOperatingStatus(
        tbmCode,
        statusMap.get(tbmCode) ?? null
      )
    }
  }
}

export const operatingStatusEngine = new OperatingStatusEngine()
