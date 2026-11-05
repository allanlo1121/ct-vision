import { CodeNameOption } from "@workspace/shared"
import type {
  Subsystem,
  CreateSubsystemInput,
  UpdateSubsystemInput,
} from "./subsystem.schemas"

export interface SubsystemRepository {
  findByCode(code: string): Promise<Subsystem | null>

  findAll(): Promise<Subsystem[]>

  findOptions(): Promise<CodeNameOption[]>

  create(input: CreateSubsystemInput): Promise<void>

  update(id: string, input: UpdateSubsystemInput): Promise<void>

  delete(id: string): Promise<void>
}
