import type {
  TbmOperatingStatus,
  CreateTbmOperatingStatusInput,
  UpdateTbmOperatingStatusInput,
} from "./operating.schemas"

export interface TbmOperatingStatusRepository {
  findByTbmCode(tbmCode: string): Promise<TbmOperatingStatus | null>

  findAll(): Promise<TbmOperatingStatus[]>

  upsert(input: CreateTbmOperatingStatusInput): Promise<void>

  delete(tbmCode: string): Promise<void>
}

