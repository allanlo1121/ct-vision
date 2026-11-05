import { connectivityRepository } from "./repositories/connectivity.repository"
import type { CreateTbmConnectionStatusInput } from "@workspace/tbm/runtime"

export async function handleHeartbeat(
  tbmCode: string,
  raw: unknown
): Promise<void> {
  // 根据实际 Heartbeat 协议校验 raw
  const input: CreateTbmConnectionStatusInput = {
    tbm_code: tbmCode,
    last_heartbeat_at: new Date().toISOString(),
  }
  await connectivityRepository.upsert(input)
  // console.log("tbmcode raw", tbmCode, raw)
}
