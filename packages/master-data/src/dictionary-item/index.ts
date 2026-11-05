// packages/master-data/src/dictionary-item/index.ts

export {
  dictionaryItemSchema,
  createDictionaryItemSchema,
  updateDictionaryItemSchema,
  dictionaryItemWithTypeSchema,
} from "./schemas"

export type {
  DictionaryItem,
  CreateDictionaryItemInput,
  UpdateDictionaryItemInput,
  DictionaryItemWithType,
} from "./schemas"

export type { DictionaryItemRepository } from "./repository"


