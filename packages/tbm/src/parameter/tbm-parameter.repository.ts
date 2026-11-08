
import type {
  TbmParameter,
  CreateTbmParameterInput,
  UpdateTbmParameterInput,
  ImportTbmParameterInput,
} from "./tbm-parameter.schemas"
import { TbmParameterWithBase } from "./types"

export interface TbmParameterRepository {
  findById(id: number): Promise<TbmParameter | null>

  findByTbmCode(tbmCode: string, subsystemCode: string | null): Promise<TbmParameterWithBase[]>

  findAll(): Promise<TbmParameter[]>

  create(input: CreateTbmParameterInput): Promise<void>

  update(id: number, input: UpdateTbmParameterInput): Promise<void>

  delete(id: number): Promise<void>

  import(tbmCode: string, input: ImportTbmParameterInput[]): Promise<void>

  syncTbmRealdataTable(tbmCode: string): Promise<void>
}
