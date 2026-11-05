import { tbmAssignmentRepository } from "./repository"
// import { createContext } from "./context"
import { tbmRealtimeContextStore } from "../context/store"
import { TbmRealtimeContext } from "../context"
import { TbmAssignmentCurrentRow } from "@workspace/tbm/tbm"

export class TbmAssignmentEngine {
  async start(): Promise<void> {
    const assignments = await tbmAssignmentRepository.list()

    const contexts = assignments.map(createContext)

    tbmRealtimeContextStore.replace(contexts)
  }
}

function createContext(
  assignment: TbmAssignmentCurrentRow
): TbmRealtimeContext {
  return {
    assignment,
    runtime: {
      operatingStatus: null,
      connectionState: null,
    },
    rules: {
      parameterThresholds: {},
    },
  }
}
