import type {
  AdminRegion,
  CreateAdminRegionInput,
  UpdateAdminRegionInput,
} from "./schemas"
import type { CodeNameOption } from "@workspace/shared"

export interface AdminRegionRepository {
  create(input: CreateAdminRegionInput): Promise<void>

  update(code: string, input: UpdateAdminRegionInput): Promise<void>

  delete(code: string): Promise<void>

  findByCode(code: string): Promise<AdminRegion | null>

  findByParentCode(parentCode: string | null): Promise<AdminRegion[]>

  findOptions(parentCode: string | null): Promise<CodeNameOption[]>

  findByLevel(level: number): Promise<AdminRegion[]>

  findAll(): Promise<AdminRegion[]>
}
