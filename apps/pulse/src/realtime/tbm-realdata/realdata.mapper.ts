import { TbmRealtimeData, TbmRuntimeData } from "../types";
import { TbmPhaseType } from "../../db/types";

import { toISOStringOrNull, toNumberOrNull } from "../../utils";

import type { TbmRuntimeState } from "../tbm-runtime";

export function buildRuntimeState(data: TbmRealtimeData): TbmRuntimeState {
  return {
    tbmCode: data.tbmCode,
    ringNo: data.ringNo,

    chainage: data.chainage,

    phaseType: getTbmPhaseType(data.values),

    thrustSpeed: toNumberOrNull(data.values?.s050009003),

    penetrationRate: toNumberOrNull(data.values?.s050109001),

    thrustPressure: toNumberOrNull(data.values?.s050001019),

    thrustCylinderStroke: toNumberOrNull(data.values?.s050006005),

    cutterSpeed: toNumberOrNull(data.values?.s010109001),

    cutterTorque: toNumberOrNull(data.values?.s010102004),

    totalThrust: toNumberOrNull(data.values?.s050001001),
    
    updatedAt: data.recordedAt ? toISOStringOrNull(data.values?.ts) ?? new Date().toISOString() : null,
  };
}


export function getTbmPhaseType(values: Record<string, number>): TbmPhaseType {
  const advanceValue = values.b000000001;
  const assemblyValue = values.b000000002;

  const hasAdvanceData = advanceValue !== undefined && advanceValue !== null;

  const hasAssemblyData = assemblyValue !== undefined && assemblyValue !== null;

  if (!hasAdvanceData && !hasAssemblyData) {
    return "unknown";
  }

  if (advanceValue === 1) {
    return "advance";
  }

  if (assemblyValue === 1) {
    return "assembly";
  }

  return "stop";
}
