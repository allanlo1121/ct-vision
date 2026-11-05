import type { TbmParameterThresholdRules } from "./types"

export class ThresholdRulesStore {
  private data = new Map<string, TbmParameterThresholdRules>()

  private listeners = new Set<(tbmCode: string) => void>()

  get(tbmCode: string): TbmParameterThresholdRules | undefined {
    return this.data.get(tbmCode)
  }

  /**
   * 新增或更新一台 TBM 的全部阈值规则
   */
  upsert(
    tbmCode: string,
    rules: TbmParameterThresholdRules
  ): void {
    this.data.set(tbmCode, rules)
    this.emit(tbmCode)
  }

  /**
   * 启动时全量替换
   */
  replace(
    rules: Record<string, TbmParameterThresholdRules>
  ): void {
    this.data = new Map(Object.entries(rules))
    this.emit("*")
  }

  /**
   * 根据 tbmCode 删除
   */
  remove(tbmCode: string): boolean {
    const deleted = this.data.delete(tbmCode)

    if (deleted) {
      this.emit(tbmCode)
    }

    return deleted
  }

  subscribe(callback: (tbmCode: string) => void) {
    this.listeners.add(callback)

    return () => {
      this.listeners.delete(callback)
    }
  }

  private emit(tbmCode: string): void {
    for (const listener of this.listeners) {
      listener(tbmCode)
    }
  }

  hasCode(tbmCode: string): boolean {
    return this.data.has(tbmCode)
  }

  list(): TbmParameterThresholdRules[] {
    return [...this.data.values()]
  }

  get size(): number {
    return this.data.size
  }

  clear(): void {
    this.data.clear()
    this.emit("*")
  }
}

export const thresholdRulesStore = new ThresholdRulesStore()