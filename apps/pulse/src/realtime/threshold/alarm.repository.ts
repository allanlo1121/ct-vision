import { pgPool } from "../../db/pg.pool";
import type { AlarmSeverity } from "./types";


export async function raiseParameterAlarm(
  tbmCode: string,
  parameterCode: string,
  ringNo: number | null,
  chainage: number | null,
  severity: AlarmSeverity,
  value: number,
  recordedAt: string

): Promise<void> {
  await pgPool.query(
    `
    insert into runtime.parameter_alarms
    (
      tbm_code,
      parameter_code,
      ring_no,
      chainage,
      alarm_value,
      severity,
      updated_at
    )
    values
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7
    )
    on conflict
    (
      tbm_code,
      parameter_code
    )
    do update set
      ring_no = excluded.ring_no,
      chainage = excluded.chainage,
      alarm_value = excluded.alarm_value,
      severity = excluded.severity,
      updated_at = excluded.updated_at
    `,
    [
      tbmCode,
      parameterCode,
      ringNo ?? null,
      chainage ?? null,
      value,
      severity,
      recordedAt ?? new Date()
    ]
  );
}

export async function recoverParameterAlarm(tbmCode: string, parameterCode: string): Promise<void> {
  await pgPool.query(
    `
    delete from runtime.parameter_alarms

    where
      tbm_code = $1
      and parameter_code = $2
    `,
    [tbmCode, parameterCode]
  );
}


