import type { TbmOperatingStatus } from "@workspace/tbm/runtime"

export class TbmOperatingStatusStore {
  private data = new Map<string, TbmOperatingStatus>()

  private listeners = new Set<(id: string) => void>()

  /**
   * MQTT 主入口
   */
  get(tbmCode: string): TbmOperatingStatus | undefined {
    return this.data.get(tbmCode)
  }

  /**
   * 新增或更新
   */
  upsert(status: TbmOperatingStatus): void {
    const previous = this.data.get(status.tbm_code!)

    // tbmCode 发生变化时清理旧索引
    if (previous && previous.tbm_code !== status.tbm_code) {
      this.data.delete(previous.tbm_code!)
    }

    this.data.set(status.tbm_code!, status)

    this.emit(status.tbm_code!)
  }

  /**
   * 启动时全量替换
   */
  replace(statuses: TbmOperatingStatus[]): void {
    const data = new Map<string, TbmOperatingStatus>()

    for (const status of statuses) {
      data.set(status.tbm_code!, status)
    }

    this.data = data
    console.log("TbmOperatingStatusStore replaced with", data)
    this.emit("*")
  }

  /**
   * 根据 tbmCode 删除
   */
  remove(tbmCode: string): boolean {
    const status = this.data.get(tbmCode)

    if (!status) {
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

  list(): TbmOperatingStatus[] {
    return [...this.data.values()]
  }

  get size(): number {
    return this.data.size
  }

  clear(): void {
    this.data.clear()
  }
}

export const tbmOperatingStatusStore = new TbmOperatingStatusStore()
