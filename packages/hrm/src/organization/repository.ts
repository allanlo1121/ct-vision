import { TreeBaseNode } from "@workspace/shared/tree"
import type {
  Organization,
  CreateOrganizationInput,
  UpdateOrganizationInput,
  ImportOrganizationInput,
} from "./schemas"
import type { OrganizationTreeNode } from "./types"

export interface OrganizationRepository {
  findById(id: string): Promise<Organization | null>

  findByCode(code: string): Promise<Organization | null>

  //   findOptions(appCode: string): Promise<OrganizationOption[]>

  findAll(): Promise<Organization[]>

  findByParentId(parentId: string | null): Promise<Organization[]>

  findAllForImport(): Promise<{ id: string; external_id: string | null }[]>

  findAllForTree(): Promise<OrganizationTreeNode[]>

  create(input: CreateOrganizationInput): Promise<void>

  update(id: string, input: UpdateOrganizationInput): Promise<void>

  importBatch(inputs: ImportOrganizationInput[]): Promise<void>

  delete(id: string): Promise<void>
}
