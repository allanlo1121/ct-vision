import { tbmParameterRepository } from "./repository"
import { toTbmParameterListItem } from "./mapper"
import type { TbmParameterListItem } from "./types"

export async function getTbmParametersByTbmCode(
  tbmCode: string
): Promise<TbmParameterListItem[]> {
  const tbmParameters = await tbmParameterRepository.findByTbmCode(tbmCode)

  return tbmParameters.map(toTbmParameterListItem)
}
