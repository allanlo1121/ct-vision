
import type {
  CreateTbmConnectionStatusInput,
  UpdateTbmConnectionStatusInput,
  TbmConnectionStatus,
  CreateTbmConnectionStatusHistoryInput,
  UpdateTbmConnectionStatusHistoryInput,
  TbmConnectionStatusHistory,
} from "./connection.schemas"

export interface TbmConnectionStatusRepository {
  findByTbmCode(tbmCode: string): Promise<TbmConnectionStatus[]>

  findAll(): Promise<TbmConnectionStatus[]>

  create(input: CreateTbmConnectionStatusInput): Promise<void>

  update(id: number, input: UpdateTbmConnectionStatusInput): Promise<void>

  upsert(input: CreateTbmConnectionStatusInput): Promise<void>

  delete(id: number): Promise<void>
}



export interface TbmConnectionStatusHistoryRepository {
  findByTbmCode(tbmCode: string): Promise<TbmConnectionStatusHistory[]>

  findAll(): Promise<TbmConnectionStatusHistory[]>

  create(input: CreateTbmConnectionStatusHistoryInput): Promise<void>

  update(id: number, input: UpdateTbmConnectionStatusHistoryInput): Promise<void>

  delete(id: number): Promise<void>
}
