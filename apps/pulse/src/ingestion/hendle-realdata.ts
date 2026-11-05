import { realdataRepository } from "./repositories/realdata.repository"
import { connectivityRepository } from "./repositories/connectivity.repository"
import { TbmRealData } from "../types"

export async function handleRealdata(
  tbmCode: string,
  data: TbmRealData
): Promise<void> {
  // console.log("tbmcode raw", tbmCode, data)
  try {
    await realdataRepository.insert(tbmCode, data)

    await connectivityRepository.upsert({
      tbm_code: tbmCode,
      last_realdata_at: new Date().toISOString(),
      last_sampled_at: new Date(data.sampledAtMs).toISOString(),
    })
  } catch (error) {
    // 入库失败交给采集层的重试与恢复机制
    console.error({ tbmCode, error }, "Realdata insert failed")
    throw error
  }
}
