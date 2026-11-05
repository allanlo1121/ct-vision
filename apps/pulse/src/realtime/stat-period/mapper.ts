import { StatPeriodSettings, StatPeriodSettingsRow } from "./types";

export function toStatPeriodSettings(row: StatPeriodSettingsRow): StatPeriodSettings {
  return {
    code: row.code,

    dayCutoffTime: row.day_cutoff_time,

    weekStartDow: Number(row.week_start_dow),

    monthStartDay: Number(row.month_start_day),

    timezone: row.timezone,
  };
}
