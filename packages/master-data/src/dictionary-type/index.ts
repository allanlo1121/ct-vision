// packages/system/src/menu/index.ts

export {
  dictionaryTypeBaseSchema,
  dictionaryTypeSchema,
  createDictionaryTypeSchema,
  updateDictionaryTypeSchema,
} from "./schemas"

export type {
  DictionaryType,
  CreateDictionaryTypeInput,
  UpdateDictionaryTypeInput,
} from "./schemas"

export type { DictionaryTypeRepository } from "./repository"
