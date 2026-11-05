import { ImportProjectInput } from "@workspace/proj/project"
import type { ProjectImportRow } from "./types"

import { toNullableNumber, toNullableString } from "@/lib/utils"

export async function mapProjectImportRowsToEntities(
  rows: ProjectImportRow[]
): Promise<ImportProjectInput[]> {
  return rows.map((row) => {
    return {
      name: row.project_name,
      code: row.project_code,
      full_name: toNullableString(row.project_fullname) ?? "",
      overview: toNullableString(row.project_overview),
      key_points: toNullableString(row.project_key_points),
      project_type_code: row.project_type,
      project_sub_type_code: toNullableString(row.son_project_type),
      management_mode_code:
        toNullableString(row.project_manage_model) ?? "10210006",
      region_code: toNullableString(row.project_region),
      country_code: toNullableString(row.project_country),
      province_code: toNullableString(row.project_province),
      city_code: toNullableString(row.project_city),
      district_code: toNullableString(row.project_county),
      address: toNullableString(row.project_address),
      latitude: toNullableNumber(row.project_lat),
      longitude: toNullableNumber(row.project_long),
      is_disabled: false,
      external_id: row.project_id ?? null,
      external_version: toNullableNumber(row.ctcemti_bltjzz_serial_version),
      created_at: row.create_date
        ? row.create_date.replace(" ", "T") + "+08:00"
        : new Date().toISOString(),
    }
  })
}
