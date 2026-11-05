export interface StatPeriodSettingsRow {
  code: string;
  day_cutoff_time: string; // 19:00
  week_start_dow: number;
  month_start_day: number;
  timezone: string; // Asia/Shanghai
  effective_from: string; // 2024-06-01
  effective_to: string; // 2024-12-31
}

export interface StatPeriodSettings {
  code: string;

  dayCutoffTime: string; // 19:00

  weekStartDow: number;

  monthStartDay: number;

  timezone: string; // Asia/Shanghai
}
