
// 单个 PLC 参数值
export type TbmParameterValue =
  | number
  | boolean
  | string
  | null

// 一组 PLC 参数数据
export type TbmParameterValues = Record<
  string,
  TbmParameterValue
>

export interface TbmRealData {
  sampledAtMs: number

  values: TbmParameterValues
}

export interface TbmRealdataRow {
  id: number
  tbm_code: string
  sampled_at: string
  created_at: string
  updated_at: string | null
}
