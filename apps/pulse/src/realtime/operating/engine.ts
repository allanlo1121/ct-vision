import { tbmOperatingStatusStore, TbmOperatingStatusStore } from "./store"
import { tbmOperatingStatusRepository } from "./repository"

import {
  type TbmOperatingStatus,
  TbmOperatingStatusRepository,
} from "@workspace/tbm/runtime"
import { resolveOperatingStatus } from "./resolve-operating-status";
import { TbmRealData } from "../../types";

export class TbmOperatingStatusEngine {
  constructor(
    private repository: TbmOperatingStatusRepository,
    private store: TbmOperatingStatusStore
  ) {}

  async start(): Promise<void> {
    await this.refreshAll()
  }

  async refreshAll(): Promise<void> {
    const operatingStatus = await this.repository.findAll()
    this.store.replace(operatingStatus)
  }
  async refresh(tbmCode: string): Promise<void> {
    const operatingStatus = await this.repository.findByTbmCode(tbmCode)

    if (operatingStatus) {
      this.store.upsert(operatingStatus)
    } else {
      this.store.remove(tbmCode)
    }
  }
  // 实时数据驱动的状态计算与写入
  async process(
    tbmCode: string,
    data: TbmRealData
  ): Promise<TbmOperatingStatus> {
    const previousState = this.store.get(tbmCode)

    // 1. 根据 PLC 数据计算新状态
    const nextState = resolveOperatingStatus(
      tbmCode,
      data
    )

    // 2. 写入数据库
    await this.repository.upsert(nextState)

    // 3. 写入成功后更新 Store
    this.store.upsert(nextState)

    // 4. 返回后续 Ring / Phase / Risk 使用
    return nextState
  }
}

export const tbmOperatingStatusEngine = new TbmOperatingStatusEngine(
  tbmOperatingStatusRepository,
  tbmOperatingStatusStore
)
