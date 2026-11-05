import type { Country, CreateCountryInput, UpdateCountryInput } from "./schemas"
import type { CodeNameOption } from "@workspace/shared"

export interface CountryRepository {
  create(input: CreateCountryInput): Promise<void>

  update(code: string, input: UpdateCountryInput): Promise<void>

  delete(code: string): Promise<void>

  findByCode(code: string): Promise<Country | null>

  findOptions(): Promise<CodeNameOption[]>

  findAll(): Promise<Country[]>
}
