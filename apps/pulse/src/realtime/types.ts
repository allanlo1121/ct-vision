export interface TbmRuntimeData {
  tbmCode: string

  recordedAt: number

  values: Record<string, number | boolean | string | null>
}

export interface TbmRealtimeData {
  tbmCode: string
  ringNo: number | null
  chainage: number | null
  recordedAt: string
  values: Record<string, number>
}

export type TbmRealData = {
  values: Record<string, number | boolean | string | null>
}
