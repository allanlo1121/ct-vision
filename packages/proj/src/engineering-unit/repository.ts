import type {
  EngineeringUnit,
  CreateEngineeringUnitInput,
  UpdateEngineeringUnitInput
} from "./schemas"

export interface EngineeringUnitRepository {
  findById(id: string): Promise<EngineeringUnit | null>

  findAll(): Promise<EngineeringUnit[]>

  findByProjectId(projectId: string | null): Promise<EngineeringUnit[]>

  create(project_id: string, input: CreateEngineeringUnitInput): Promise<void>

  update(id: string, input: UpdateEngineeringUnitInput): Promise<void>

  delete(id: string): Promise<void>
}
