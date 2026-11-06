import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  EmployeeRepository,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  Employee,
  ImportEmployeeInput,
} from "@workspace/hrm/employee"


import { employeeSchema } from "@workspace/hrm/employee"

export const employeeRepository: EmployeeRepository = {
  async findById(id: string): Promise<Employee | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("hrm")
      .from("employees")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? employeeSchema.parse(data) : null
  },
  async findByCode(code: string): Promise<Employee | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("hrm")
      .from("employees")
      .select("*")
      .eq("code", code)
      .maybeSingle()

    assertNoError(error)

    return data ? employeeSchema.parse(data) : null
  },

  async findAll(): Promise<Employee[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("hrm")
      .from("employees")
      .select("*")
      .order("sort_order")

    assertNoError(error)

    return data ? data.map((item) => employeeSchema.parse(item)) : []
  },
  async findByOrganizationId(organizationId: string): Promise<Employee[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("hrm")
      .from("employees")
      .select("*")
      .eq("organization_id", organizationId)
      .order("code")

    assertNoError(error)

    return data ? data.map((item) => employeeSchema.parse(item)) : []
  },


  async create(input: CreateEmployeeInput): Promise<void> {
    const supabase = await createClient()


    const { data, error } = await supabase
      .schema("hrm")
      .from("employees")
      .insert(input)
      .select("*")
      .maybeSingle()


    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建组织失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(id: string, input: UpdateEmployeeInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("hrm")
      .from("employees")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新组织失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(id: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("hrm")
      .from("employees")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
  async importBatch(inputs: ImportEmployeeInput[]): Promise<void> {
    console.log("Importing Employees with inputs:", inputs)
    const supabase = await createClient()

    const { error } = await supabase
      .schema("hrm")
      .from("employees")
      .insert(inputs)

    assertNoError(error)
  },
}
