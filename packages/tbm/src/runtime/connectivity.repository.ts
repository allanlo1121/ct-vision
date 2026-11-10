
import { TbmCode } from "@workspace/shared";
import type {
  TbmConnectivity,
  CreateTbmConnectivityHistoryInput,
  UpdateTbmConnectivityHistoryInput,
  TbmConnectivityHistory,
} from "./connectivity.schemas"

export interface TbmConnectivityRepository {
  findByTbmCode(tbmCode: TbmCode): Promise<TbmConnectivity | null>

  listAll(): Promise<TbmConnectivity[]>

  delete(tbmCode: TbmCode): Promise<void>
}



export interface TbmConnectivityHistoryRepository {
  findByTbmCode(tbmCode: string): Promise<TbmConnectivityHistory[]>

  findAll(): Promise<TbmConnectivityHistory[]>

  create(input: CreateTbmConnectivityHistoryInput): Promise<void>

  update(id: number, input: UpdateTbmConnectivityHistoryInput): Promise<void>

  delete(id: number): Promise<void>
}
