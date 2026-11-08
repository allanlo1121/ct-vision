import type {
  ParameterThresholdDefault,
  CreateParameterThresholdDefaultInput,
  UpdateParameterThresholdDefaultInput,
  ParameterThresholdDefaultWithBase,
  TbmThresholdRuleList
} from "./threshold.schemas"




export interface ParameterThresholdDefaultRepository {
  findById(id: number): Promise<ParameterThresholdDefault | null>

  findByParameterCode(parameterCode: string): Promise<ParameterThresholdDefault[]>

  findAll(): Promise<ParameterThresholdDefault[]>

  listAll(subsystemCode: string | null): Promise<ParameterThresholdDefaultWithBase[]>

  create(input: CreateParameterThresholdDefaultInput): Promise<void>

  update(id: number, input: UpdateParameterThresholdDefaultInput): Promise<void>

  delete(id: number): Promise<void>

  upsertMany(
    inputs: CreateParameterThresholdDefaultInput[]
  ): Promise<void>
}



import type {
  TbmParameterThreshold,
  CreateTbmParameterThresholdInput,
  UpdateTbmParameterThresholdInput,
  TbmParameterThresholdWithBase
} from "./threshold.schemas"
import { TbmParameterThresholdRuleList } from "./types"

export interface TbmParameterThresholdRepository {
  findById(id: number): Promise<TbmParameterThreshold | null>

  findByTbmParameterId(
    tbmParameterId: number
  ): Promise<TbmParameterThreshold | null>

  listByTbmCode(
    tbmCode: string,
    subsystemCode: string | null
  ): Promise<TbmParameterThresholdWithBase[]>

  findByTbmCodes(tbmCodes: string[]): Promise<TbmThresholdRuleList[]>

  findAll(): Promise<TbmParameterThreshold[]>

  create(input: CreateTbmParameterThresholdInput): Promise<void>

  update(id: number, input: UpdateTbmParameterThresholdInput): Promise<void>

  delete(id: number): Promise<void>

  upsertMany(
    inputs: CreateTbmParameterThresholdInput[]
  ): Promise<void>
}
