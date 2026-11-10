
import { TbmConnectivity } from "@workspace/tbm/runtime"
import { tbmConnectivityRepository } from "./repository"



export async function getTbmConnectivityList(
    tbmCode?: string
): Promise<TbmConnectivity[]> {
    if (!tbmCode) {
        return tbmConnectivityRepository.listAll()
    }

    const data = await tbmConnectivityRepository.findByTbmCode(tbmCode)

    return data ? [data] : []
}