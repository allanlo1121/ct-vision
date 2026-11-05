import { TbmAssignmentStore, tbmAssignmentStore } from "./store"
import {
  tbmAssignmentCurrentRepository,
} from "./repository"

import {
  type TbmAssignmentCurrentRow,
  TbmAssignmentCurrentRepository,
} from "@workspace/tbm/tbm"

export class TbmAssignmentEngine {
  constructor(
    private repository: TbmAssignmentCurrentRepository,
    private store: TbmAssignmentStore
  ) {}

  async start(): Promise<void> {
    await this.refreshAll()
  }

  async refreshAll(): Promise<void> {
    const assignments = await this.repository.list()
    this.store.replace(assignments)
  }

  async refresh(tbmCode: string): Promise<void> {
    const assignment = await this.repository.findByTbmCode(tbmCode)

    if (assignment) {
      this.store.upsert(assignment)
    } else {
      this.store.remove(tbmCode)
    }
  }
}

export const tbmAssignmentEngine = new TbmAssignmentEngine(
  tbmAssignmentCurrentRepository,
  tbmAssignmentStore
)
