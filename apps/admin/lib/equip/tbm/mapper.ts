import type { ImportTbmInput } from "@workspace/tbm/tbm"
import type { TbmImportRow } from "./types"

import { toNullableNumber, toNullableString } from "@/lib/utils"

export async function mapTbmImportRowsToEntities(
  rows: TbmImportRow[]
): Promise<ImportTbmInput[]> {
  return rows.map((row) => {
    return {
      name: row.name,
      code: row.code,
      tbm_type_code: row.tbm_type_code,
      diameter: toNullableNumber(row.diameter),
    }
  })
}
