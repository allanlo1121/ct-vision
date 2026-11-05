
import { tbmRealtimeContextStore } from "./realtime-context/store";
import { TbmRealtimeData } from "./types";
import { extractChainage, extractRingNo, insertShieldRealdata, normalizePayload } from "./tbm-realdata";
import { buildRuntimeState, extractTbmTimestamp, extractTbmTimestampMs } from "./tbm-realdata";

import { processRuntimeState, tbmRuntimeRepository } from "./tbm-runtime";

import { processParameterAlarms } from "../realtime/parameter-alarm/parameter-alarm.process"
import { processRealdataConnection } from "./tbm-connection";

import { processTbmDailyProgress } from "./tbm-progress";
import { processTunnelRisks } from "./tbm-risk/risk.process";



export async function handleRealtimeData(
    tbmCode: string,
    raw: any
) {
    const recordedAt = extractTbmTimestamp(raw)
    // 1. 加载运行上下文
    const context =
        tbmRealtimeContextStore.get(tbmCode)

    // console.log("context", context)

    if (!context) {
        console.warn(
            "No realtime context found for TBM",
            {
                tbmCode,
                recordedAt,
                timestamp: new Date().toISOString()
            }
        )
        return
    }


    //const recordedAtMs = extractTbmTimestampMs(raw)

    const ringNo = extractRingNo(raw)

    const chainage = extractChainage(raw)

    const values = normalizePayload(raw)


    // MQTT 原始字段映射
    const data: TbmRealtimeData = {
        tbmCode,
        ringNo,
        chainage,
        recordedAt,
        values: { ...values },
    };

    await insertShieldRealdata(data);



    // 2. 标记实时数据连接在线
    const connectionResult =
        await processRealdataConnection(
            tbmCode,
            recordedAt,
        )

    console.log("processRealdataConnection result", connectionResult)

    // 3. MQTT 原始数据标准化
    const snapshot =
        buildRuntimeState(data)


    const { runtimeState } = context


    //环号异常 施工状态等处理
    const validRingNoResult = await processRuntimeState(
        runtimeState,
        snapshot
    )

    tbmRealtimeContextStore.update(tbmCode, { runtimeState: snapshot })
    tbmRuntimeRepository.upsertTbmRuntimeState(snapshot)

    const { tbmAssignment, risks } = context

    // 4. 进环处理
    if (validRingNoResult.changed) {
        console.log("TBM ring number changed", {
            tbmCode,
            previousRingNo: validRingNoResult.previousRingNo,
            currentRingNo: validRingNoResult.currentRingNo,
            delta: validRingNoResult.delta,
            anomaly: validRingNoResult.anomaly,
        })
        await processTbmDailyProgress(snapshot)
        if (chainage != null) {
            processTunnelRisks(tbmAssignment, snapshot, risks)
        }
    }



    //   // 8. 参数阈值报警
    await processParameterAlarms(
        context,
        data,
        validRingNoResult.changed
    )


}