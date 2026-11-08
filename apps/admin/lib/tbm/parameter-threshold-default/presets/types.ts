
import { ThresholdType, MasterDataCode } from "@workspace/shared"


export type ThresholdPresetRule = {
    parameter_code: string
    threshold_type: ThresholdType
    alert_severity_code: MasterDataCode
    reference_value: number | null
    threshold_value: number
    deadband: number
    recovery_delay_ms: number
    remark?: string
}

export type ThresholdPreset = {
    code: string
    name: string
    description?: string
    rules: ThresholdPresetRule[]
}