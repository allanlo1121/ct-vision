import { pgPool } from "../../db/pg.pool";
import { toStatPeriodSettings } from "./mapper";
import { StatPeriodSettings } from "./types";

let statSettings: StatPeriodSettings;

export function setStatSettings(settings: StatPeriodSettings) {
  statSettings = settings;
}

export function getStatSettings() {
  if (!statSettings) {
    throw new Error("Stat settings not initialized");
  }

  return statSettings;
}

export async function getCurrentStatPeriodSettings() {
  const result = await pgPool.query(`
    select *
    from public.stat_period_settings
    where code = 'tunnel_progress'
      and effective_to is null
    limit 1
  `);

  return toStatPeriodSettings(result.rows[0]);
}

export async function loadStatSettings() {
  statSettings = await getCurrentStatPeriodSettings();
}
