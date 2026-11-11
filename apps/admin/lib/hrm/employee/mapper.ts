import { ImportEmployeeInput } from "@workspace/hrm/employee"
import type { EmployeeImportRow } from "./import.types"
import { employeeRepository } from "./repository"
import { organizationRepository } from "../organization/repository"
import { toNullableDate, toNullableNumber, toNullableString } from "@/lib/utils"

export async function mapEmployeeImportRowsToEntities(
  rows: EmployeeImportRow[]
): Promise<ImportEmployeeInput[]> {
  const organizations = await organizationRepository.findAllForImport()

  const organizationMap = new Map(
    organizations
      .filter((org) => org.external_id)
      .map((org) => [org.external_id!, org.id])
  )

  return rows.map((row) => {
    if (!row.emp_bel_dept) {
      throw new Error(`组织 ${row.emp_name} 缺少所属组织`)
    }

    const organizationId = organizationMap.get(row.emp_bel_dept)

    if (!organizationId) {
      throw new Error(
        `组织 ${row.emp_name} 的上级组织不存在：${row.emp_bel_dept}`
      )
    }

    return {
      name: row.emp_name,
      code: row.emp_code,
      organization_id: organizationId,
      employment_type_code: row.emp_type,
      gender_code: toNullableString(row.emp_sex),
      birth_date: toNullableString(row.emp_birthday),
      id_card: toNullableString(row.emp_idcard),
      email: toNullableString(row.emp_mail),
      phone: toNullableString(row.emp_tel),
      hire_date: toNullableDate(row.emp_worktime),

      is_disabled: false,
      external_id: row.emp_id ?? null,
      external_version: toNullableNumber(row.ctcemti_bltjzz_serial_version),
      created_at: row.create_date
        ? row.create_date.replace(" ", "T") + "+08:00"
        : new Date().toISOString(),
    }
  })
}
