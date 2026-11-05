
import type { RingValidationResult } from "./types";


export function validateRingChange(
    previousRingNo: number | null,
    currentRingNo: number | null
): RingValidationResult {
    // 当前环号异常
    if (currentRingNo === null) {
        return {
            valid: false,
            changed: false,
            previousRingNo,
            currentRingNo,
            delta: null,
            anomaly: "invalid",
        }
    }

    // 初次获取环号
    if (previousRingNo === null) {
        return {
            valid: false,
            changed: false,
            previousRingNo,
            currentRingNo,
            delta: null,
            anomaly: null,
        }
    }

    const delta =
        currentRingNo - previousRingNo

    // 环号未变化
    if (delta === 0) {
        return {
            valid: true,
            changed: false,
            previousRingNo,
            currentRingNo,
            delta,
            anomaly: null,
        }
    }

    // 环号回滚
    if (delta < 0) {
        return {
            valid: false,
            changed: true,
            previousRingNo,
            currentRingNo,
            delta,
            anomaly: "rollback",
        }
    }

    // 环号跳跃
    if (delta > 3) {
        return {
            valid: false,
            changed: true,
            previousRingNo,
            currentRingNo,
            delta,
            anomaly: "jump",
        }
    }

    // 正常 +1
    return {
        valid: true,
        changed: true,
        previousRingNo,
        currentRingNo,
        delta,
        anomaly: null,
    }
}