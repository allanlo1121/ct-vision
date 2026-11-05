import type {
  Parameter,
  CreateParameterInput,
  UpdateParameterInput,
  ImportParameterInput,
} from "./schemas"

export interface ParameterRepository {
  findByCode(code: string): Promise<Parameter | null>

  findAll(): Promise<Parameter[]>

  findBySubsystemCode(subsystemCode: string | null): Promise<Parameter[]>

  create(input: CreateParameterInput): Promise<void>

  update(id: string, input: UpdateParameterInput): Promise<void>

  delete(id: string): Promise<void>
}
