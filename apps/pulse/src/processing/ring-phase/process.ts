import { CreateRingPhaseRecordInput } from "@workspace/tbm/runtime"
import { TbmPhaseType } from "@workspace/shared"
import { ringPhaseRecordRepository } from "./repository"

export async function processRingPhase(
  tbmCode: string,
  tunnelId: string,
  ringNo: number,
  tbmPhaseType: TbmPhaseType,
  sampledAt: string,
  chaiange: number | null
): Promise<void> {
  // 1. 获取环数据

  const input: CreateRingPhaseRecordInput = {
    tbm_code: tbmCode,
    tunnel_id: tunnelId,
    ring_no: ringNo,
    tbm_phase_type: tbmPhaseType,
    started_at: sampledAt,
    start_chainage: chaiange!,
  }

  // 2. 调用存储过程处理环数据
  const res = await ringPhaseRecordRepository.apply(input)
  // console.log("processRingPhase result", tbmCode, res)
}
