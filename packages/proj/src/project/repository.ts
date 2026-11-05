import type {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
  ImportProjectInput,
} from "./schemas"

export interface ProjectRepository {
  findById(id: string): Promise<Project | null>

  findByCode(code: string): Promise<Project | null>

  //   findOptions(appCode: string): Promise<ProjectOption[]>

  findAll(): Promise<Project[]>

  findByOrganizationId(organizationId: string | null): Promise<Project[]>

  findAllForImport(): Promise<{ id: string; external_id: string | null }[]>

  create(input: CreateProjectInput): Promise<void>

  update(id: string, input: UpdateProjectInput): Promise<void>

  importBatch(inputs: ImportProjectInput[]): Promise<void>

  delete(id: string): Promise<void>
}
