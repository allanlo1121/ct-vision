import type {
  ParameterThreshold,
  CreateParameterThresholdInput,
  UpdateParameterThresholdInput,
} from "./threshold.schemas"
import { ParameterThresholdListRow } from "./types"

export interface ParameterThresholdRepository {
  findById(id: number): Promise<ParameterThreshold | null>

  findByTbmParameterId(
    tbmParameterId: number
  ): Promise<ParameterThreshold | null>

  findByTbmCodes(tbmCode: string[]): Promise<ParameterThresholdListRow[]>

  findAll(): Promise<ParameterThreshold[]>

  create(input: CreateParameterThresholdInput): Promise<void>

  update(id: number, input: UpdateParameterThresholdInput): Promise<void>

  delete(id: number): Promise<void>
}
