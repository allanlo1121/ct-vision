export async function createSystemAlarm(
  client: any,
  input: {
    tbmId: string;
    alarmType: string;
    level: "info" | "warning" | "critical";
    title: string;
    message?: string;
    oldValue?: number;
    newValue?: number;
    deltaValue?: number;
    occurredAt: string;
    metadata?: Record<string, unknown>;
  }
) {
  await client.query(
    `
    insert into public.tbm_system_alarm_events (
      tbm_id,
      alarm_type,
      level,
      title,
      message,
      old_value,
      new_value,
      delta_value,
      occurred_at,
      metadata
    )
    values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `,
    [
      input.tbmId,
      input.alarmType,
      input.level,
      input.title,
      input.message ?? null,
      input.oldValue ?? null,
      input.newValue ?? null,
      input.deltaValue ?? null,
      input.occurredAt,
      JSON.stringify(input.metadata ?? {}),
    ]
  );
}
