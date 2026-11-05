import { realdataSupabase, supabase } from "../../db/supabase"

import type { TbmRealData } from "../../types"

export type RealdataTableName = `shield_${string}`

function getShieldTableName(tbmCode: string): RealdataTableName {
  const normalized = tbmCode.toLowerCase().replace(/[^a-z0-9_]/g, "_")

  return `shield_${normalized}` as RealdataTableName
}

async function getAllowedParameterCodes(tbmCode: string): Promise<Set<string>> {
  const { data, error } = await supabase
    .schema("tbm")
    .from("tbm_parameters")
    .select("parameter_code")
    .eq("tbm_code", tbmCode)
    .eq("is_disabled", false)

  if (error) throw error

  return new Set((data ?? []).map((row) => row.parameter_code))
}

export const realdataRepository = {
  insert: async function (tbmCode: string, data: TbmRealData): Promise<void> {
    const tableName = getShieldTableName(tbmCode)

    const allowedCodes = await getAllowedParameterCodes(tbmCode)

    const values = Object.fromEntries(
      Object.entries(data.values).filter(
        ([code, value]) => allowedCodes.has(code) && value !== undefined
      )
    )

    // console.log("Inserting row into table:", tableName, values)

    const row = {
      tbm_code: tbmCode,
      sampled_at: new Date(data.sampledAtMs).toISOString(),
      ...values,
    }

    const { error } = await realdataSupabase
      .schema("tbm")
      .from(tableName)
      .insert(row as never)

    if (error) throw error
  },
}
