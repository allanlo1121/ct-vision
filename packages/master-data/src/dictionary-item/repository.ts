import type {
  DictionaryItem,
  CreateDictionaryItemInput,
  UpdateDictionaryItemInput,
  DictionaryItemWithType,
} from "./schemas"

import type { CodeNameOption } from "@workspace/shared"

export interface DictionaryItemRepository {
  findByCode(code: string): Promise<DictionaryItem | null>

  findOptions(): Promise<CodeNameOption[]>

  findAll(): Promise<DictionaryItem[]>

  findAllWithType(): Promise<DictionaryItemWithType[]>

  findOptionsByType(typeCode: string): Promise<CodeNameOption[]>

  create(input: CreateDictionaryItemInput): Promise<void>

  update(code: string, input: UpdateDictionaryItemInput): Promise<void>

  delete(code: string): Promise<void>
}
