import { tbmAssignmentRepository } from "./repository"
// import { createContext } from "./context"
import { tbmRealtimeContextStore } from "../store"
import { TbmRealtimeContext } from "../types"

import { TbmAssignmentContext } from "@workspace/tbm/tbm"

export class TbmAssignmentEngine {
  async start(): Promise<void> {
    const assignments = await tbmAssignmentRepository.list()

    const contexts = assignments.map(createContext)

    tbmRealtimeContextStore.replace(contexts)
  }

  async refresh(tbmCode: string): Promise<void> {
    const assignment = await tbmAssignmentRepository.findByTbmCode(tbmCode)

    if (!assignment) {
      tbmRealtimeContextStore.remove(tbmCode)
      return
    }

    const current = tbmRealtimeContextStore.get(tbmCode)

    if (current) {
      tbmRealtimeContextStore.updateAssignment(tbmCode, assignment)
      return
    }

    tbmRealtimeContextStore.set(tbmCode, {
      assignment,
      rules: {},
    })
  }

  /**
   * 全量同步分配关系
   * 保留已有 TBM 的阈值规则
   */
  async refreshAll(): Promise<void> {
    const assignments = await tbmAssignmentRepository.list()

    // 数据库当前有效的 TBM
    const activeCodes = new Set(assignments.map((item) => item.tbm_code))

    // 1. 新增或更新
    for (const assignment of assignments) {
      const tbmCode = assignment.tbm_code

      const current = tbmRealtimeContextStore.get(tbmCode)

      if (current) {
        tbmRealtimeContextStore.updateAssignment(tbmCode, assignment)
      } else {
        tbmRealtimeContextStore.set(tbmCode, {
          assignment,
          rules: {},
        })
      }
    }

    // 2. 删除已经失效的 TBM
    for (const context of tbmRealtimeContextStore.values()) {
      const tbmCode = context.assignment.tbm_code

      if (!activeCodes.has(tbmCode)) {
        tbmRealtimeContextStore.remove(tbmCode)
      }
    }
  }
}

function createContext(assignment: TbmAssignmentContext): TbmRealtimeContext {
  return {
    assignment,

    rules: {},
  }
}

export const tbmAssignmentEngine = new TbmAssignmentEngine()
