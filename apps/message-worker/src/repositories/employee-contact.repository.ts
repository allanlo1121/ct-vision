import { supabase } from "../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"


import { EmployeeContactRepository, type EmployeeContact } from "@workspace/hrm/employee"

export const employeeContactRepository: EmployeeContactRepository = {
  async findContactsByIds(ids: string[]): Promise<EmployeeContact[]> {
    if (ids.length === 0) return []

    const { data, error } = await supabase
      .schema("hrm")
      .from("employees")
      .select("id, code, phone, email")
      .in("id", ids)

    assertNoError(error)

    return (data ?? []).map((employee) => ({
      employee_id: employee.id,
      mobile: employee.phone,
      email: employee.email,
      code: employee.code,
    }))
  }
}





