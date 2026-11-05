import type {
  GeologicalType,
  CreateGeologicalTypeInput,
  UpdateGeologicalTypeInput,
} from "./schemas"
import type { CodeNameOption } from "@workspace/shared"

export interface GeologicalTypeRepository {
  create(input: CreateGeologicalTypeInput): Promise<void>

  update(code: string, input: UpdateGeologicalTypeInput): Promise<void>

  delete(code: string): Promise<void>

  findByCode(code: string): Promise<GeologicalType | null>

  findByParentCode(parentCode: string | null): Promise<GeologicalType[]>

  findOptions(parentCode: string | null): Promise<CodeNameOption[]>

  findAll(): Promise<GeologicalType[]>
}
