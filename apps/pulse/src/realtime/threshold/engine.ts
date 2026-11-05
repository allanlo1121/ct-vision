import { tbmAssignmentRepository } from "./repository"
// import { createContext } from "./context"
import { tbmRealtimeContextStore } from "../context/store"
import { TbmRealtimeContext } from "../context"
import { TbmAssignmentCurrentRow } from "@workspace/tbm/tbm"





export class ParameterThresholdEngine {
  async start(): Promise<void> {
    const tbmCodes = tbmRealtimeContextStore
      .values()
      .map((context) => context.assignment.tbmCode)

    if (tbmCodes.length === 0) return

    const rulesByTbm =
      await parameterThresholdRepository.findByTbmCodes(
        tbmCodes
      )

    for (const tbmCode of tbmCodes) {
      tbmRealtimeContextStore.updateThresholdRules(
        tbmCode,
        rulesByTbm[tbmCode] ?? {}
      )
    }
  }
}