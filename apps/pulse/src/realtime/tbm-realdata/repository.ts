import { pgPool } from "../../db/pg.pool";

import { TbmRealtimeData, TbmRuntimeData } from "../types";



function normalizeTbmCode(tbmCode: string) {
  return tbmCode.toLowerCase().replace(/[^a-z0-9_]/g, "_");
}

function quoteIdent(name: string) {
  return `"${name.replace(/"/g, '""')}"`;
}

function getShieldTableName(tbmCode: string) {
  return `shield_${normalizeTbmCode(tbmCode)}`;
}



async function getAllowedParameterCodes(
  tbmCode: string
): Promise<Set<string>> {
  const { rows } = await pgPool.query<{ parameter_code: string }>(
    `
    select tp.parameter_code
    from tbm.tbm_parameters tp
    where tp.tbm_code = $1
      and coalesce(tp.is_disabled, false) = false
    `,
    [tbmCode]
  )

  return new Set(rows.map((row) => row.parameter_code))
}


export async function insertShieldRealdata(data: TbmRealtimeData) {
  // console.log("Persisting runtime data to database", {
  //   tbmCode: data.tbmCode,
  //   recordedAt: data.recordedAt,
  //   dataValues: data.values,
  // });
  const tableName = getShieldTableName(data.tbmCode);
  const fullTableName = `realdata.${quoteIdent(tableName)}`;

  // const context = await getTbmRuntimeContextByCode(data.tbmCode);


  const allowedCodes = await getAllowedParameterCodes(data.tbmCode);

  // console.log("Allowed parameter codes for TBM", data.tbmCode, Array.from(allowedCodes));

  const entries = Object.entries(data.values)
    .filter(([code]) => allowedCodes.has(code))
    .filter(([, value]) => value !== undefined);

  const columns = ["tbm_code", "recorded_at", ...entries.map(([code]) => quoteIdent(code))];

  const placeholders = columns.map((_, index) => `$${index + 1}`);

  const sql = `
    insert into ${fullTableName} (
      ${columns.join(", ")}
    )
    values (
      ${placeholders.join(", ")}
    )
  `;

  const params = [data.tbmCode, data.recordedAt, ...entries.map(([, value]) => value)];

  await pgPool.query(sql, params);
}

