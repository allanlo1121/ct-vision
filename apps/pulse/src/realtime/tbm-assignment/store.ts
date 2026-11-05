import type { TbmAssignmentCurrentRow } from "@workspace/tbm/tbm"

export class TbmAssignmentStore {
  private data = new Map<string, TbmAssignmentCurrentRow>()

  private listeners = new Set<(id: string) => void>()

  /**
   * MQTT 主入口
   */
  get(tbmCode: string): TbmAssignmentCurrentRow | undefined {
    return this.data.get(tbmCode)
  }

  /**
   * 新增或更新
   */
  upsert(assignment: TbmAssignmentCurrentRow): void {
    const previous = this.data.get(assignment.tbm_code!)

    // tbmCode 发生变化时清理旧索引
    if (previous && previous.tbm_code !== assignment.tbm_code) {
      this.data.delete(previous.tbm_code!)
    }

    this.data.set(assignment.tbm_code!, assignment)

    this.emit(assignment.tbm_code!)
  }

  /**
   * 启动时全量替换
   */
  replace(assignments: TbmAssignmentCurrentRow[]): void {
    const data = new Map<string, TbmAssignmentCurrentRow>()

    for (const assignment of assignments) {
      data.set(assignment.tbm_code!, assignment)
    }

    this.data = data
    console.log("TbmAssignmentStore replaced with", data)
    this.emit("*")
  }

  /**
   * 根据 tbmCode 删除
   */
  remove(tbmCode: string): boolean {
    const assignment = this.data.get(tbmCode)

    if (!assignment) {
      return false
    }

    this.data.delete(tbmCode)

    this.emit(tbmCode)
    return true
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

  list(): TbmAssignmentCurrentRow[] {
    return [...this.data.values()]
  }

  get size(): number {
    return this.data.size
  }

  clear(): void {
    this.data.clear()
  }
}

export const tbmAssignmentStore = new TbmAssignmentStore()
