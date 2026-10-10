import type {
  Country,
  CountryQuery,
  CreateCountryInput,
  UpdateCountryInput,
} from "./schemas"
import type { PaginatedResult } from "@workspace/shared"

export interface CountryRepository {
  create(input: CreateCountryInput): Promise<Country>

  update(code: string, input: UpdateCountryInput): Promise<Country>

  delete(code: string): Promise<void>

  paginate(query: CountryQuery): Promise<PaginatedResult<Country>>
  findByCode(code: string): Promise<Country | null>

  findChildren(parentCode: string | null): Promise<Country[]>

  findAll(): Promise<Country[]>
}
