import { thresholdRuleRepository } from "./repository"

import { tbmRealtimeContextStore } from "../store"

import {
  buildMultiTbmThresholdRules,
  buildTbmThresholdRules,
} from "./build"

export class ThresholdEngine {
  async start(): Promise<void> {
    const tbmCodes = tbmRealtimeContextStore
      .values()
      .map((context) => context.assignment.tbm_code)

    if (tbmCodes.length === 0) return

    const rows = await thresholdRuleRepository.findByTbmCodes(tbmCodes)

    const rulesByTbm = buildMultiTbmThresholdRules(rows)

    for (const tbmCode of tbmCodes) {
      tbmRealtimeContextStore.updateThresholdRules(
        tbmCode,
        rulesByTbm[tbmCode] ?? {}
      )
    }
  }
  async refresh(tbmCode: string): Promise<void> {
    const rows = await thresholdRuleRepository.findByTbmCodes([tbmCode])

    const rules = buildTbmThresholdRules(rows)

    tbmRealtimeContextStore.updateThresholdRules(tbmCode, rules)
  }
  async refreshByTunnelId(tunnelId: string): Promise<void> {
    const context = tbmRealtimeContextStore.getByTunnelId(tunnelId)
    if (!context) return

    await this.refresh(context.assignment.tbm_code)
  }
}

export const thresholdEngine = new ThresholdEngine()
