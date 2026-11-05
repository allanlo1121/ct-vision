import type { AlarmSeverity } from "./types";

export const severityRank: Record<AlarmSeverity, number> = {
  warning: 1,
  critical: 2,
  emergency: 3,
};
