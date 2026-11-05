import { ImportOrganizationInput } from "@workspace/hrm/organization"
import type { OrganizationImportRow } from "./types"
import { organizationRepository } from "./repository"
import { toNullableNumber, toNullableString } from "@/lib/utils"

export async function mapOrganizationImportRowsToEntities(
  rows: OrganizationImportRow[]
): Promise<ImportOrganizationInput[]> {
  const organizations = await organizationRepository.findAllForImport()

  const parentMap = new Map(
    organizations
      .filter((org) => org.external_id)
      .map((org) => [org.external_id!, org.id])
  )

  return rows.map((row) => {
    if (!row.org_parent) {
      throw new Error(`组织 ${row.org_name} 缺少上级组织`)
    }

    const parentId = parentMap.get(row.org_parent)

    if (!parentId) {
      throw new Error(
        `组织 ${row.org_name} 的上级组织不存在：${row.org_parent}`
      )
    }

    return {
      name: row.org_short,
      code: row.org_code,
      parent_id: parentId,
      full_name: toNullableString(row.org_name) ?? "",
      org_type_code: row.org_type,
      org_category_code: toNullableString(row.org_business),
      country_code: toNullableString(row.org_country),
      province_code: toNullableString(row.org_province),
      city_code: toNullableString(row.org_city),
      district_code: toNullableString(row.org_county),
      address: toNullableString(row.org_address),
      latitude: toNullableNumber(row.org_address_lat),
      longitude: toNullableNumber(row.org_address_lon),

      sort_order: toNullableNumber(row.org_number) ?? 0,
      is_disabled: false,
      external_id: row.org_id ?? null,
      external_version: toNullableNumber(row.ctcemti_bltjzz_serial_version),
      created_at: row.create_date
        ? row.create_date.replace(" ", "T") + "+08:00"
        : new Date().toISOString(),
    }
  })
}
