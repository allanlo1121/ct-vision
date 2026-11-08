
import { ThresholdPreset } from "./types"

export const guidancePreset: ThresholdPreset = {
    code: "guidance",
    name: "导向参数标准阈值",
    description: "自动配置导向偏差报警规则",

    rules: [
        {
            parameter_code: "s100206003",
            threshold_type: "deviation",
            alert_severity_code: "52010001",
            reference_value: 0,
            threshold_value: 50,
            deadband: 2,
            recovery_delay_ms: 60000,
            remark: "前点水平偏差",
        },
        {
            parameter_code: "s100206004",
            threshold_type: "deviation",
            alert_severity_code: "52010001",
            reference_value: 0,
            threshold_value: 50,
            deadband: 2,
            recovery_delay_ms: 60000,
            remark: "前点垂直偏差",
        },
        {
            parameter_code: "s100206006",
            threshold_type: "deviation",
            alert_severity_code: "52010001",
            reference_value: 0,
            threshold_value: 50,
            deadband: 2,
            recovery_delay_ms: 60000,
            remark: "后点水平偏差",
        },
        {
            parameter_code: "s100206007",
            threshold_type: "deviation",
            alert_severity_code: "52010001",
            reference_value: 0,
            threshold_value: 50,
            deadband: 2,
            recovery_delay_ms: 60000,
            remark: "后点垂直偏差",
        },
    ],
}