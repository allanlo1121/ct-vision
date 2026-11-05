import type {
  Application,
  CreateApplicationInput,
  UpdateApplicationInput,
} from "./schemas"

import type { CodeNameOption } from "@workspace/shared"

export interface ApplicationRepository {
  findByCode(code: string): Promise<Application | null>

  findOptions(): Promise<CodeNameOption[]>

  findAll(): Promise<Application[]>

  create(input: CreateApplicationInput): Promise<Application>

  update(code: string, input: UpdateApplicationInput): Promise<Application>

  delete(code: string): Promise<void>
}
