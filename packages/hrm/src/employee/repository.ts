import type {
  Employee,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  ImportEmployeeInput,
} from "./schemas"

export interface EmployeeRepository {
  findById(id: string): Promise<Employee | null>

  findByCode(code: string): Promise<Employee | null>

  // findContactsByIds(employeeIds: string[]): Promise<Employee[]>

  //   findOptions(appCode: string): Promise<EmployeeOption[]>

  findAll(): Promise<Employee[]>

  findByOrganizationId(organizationId: string): Promise<Employee[]>

  create(input: CreateEmployeeInput): Promise<void>

  update(id: string, input: UpdateEmployeeInput): Promise<void>

  importBatch(inputs: ImportEmployeeInput[]): Promise<void>

  delete(id: string): Promise<void>
}

import { EmployeeContact } from "./types"

export interface EmployeeContactRepository {
  findContactsByIds(employeeIds: string[]): Promise<EmployeeContact[]>
}