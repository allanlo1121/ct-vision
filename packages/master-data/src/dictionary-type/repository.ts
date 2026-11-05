import type {
  DictionaryType,
  CreateDictionaryTypeInput,
  UpdateDictionaryTypeInput,
} from "./schemas"

import type { CodeNameOption } from "@workspace/shared"

export interface DictionaryTypeRepository {
  findByCode(code: string): Promise<DictionaryType | null>

  findOptions(): Promise<CodeNameOption[]>

  findAll(): Promise<DictionaryType[]>

  create(input: CreateDictionaryTypeInput): Promise<void>

  update(code: string, input: UpdateDictionaryTypeInput): Promise<void>

  delete(code: string): Promise<void>
}
