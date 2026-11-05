import { ParameterThresholdRule } from "./types";

export function evaluateThreshold(value: number, rule: ParameterThresholdRule): boolean {
  switch (rule.thresholdType) {
    case "upper":
      return value > Number(rule.thresholdValue);

    case "lower":
      return value < Number(rule.thresholdValue);

    case "deviation":
      return Math.abs(value - Number(rule.referenceValue)) > Number(rule.thresholdValue);

    case "range":
      return value < Number(rule.minValue) || value > Number(rule.maxValue);

    default:
      return false;
  }
}
