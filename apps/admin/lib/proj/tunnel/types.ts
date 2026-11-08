



export interface TunnelPickerItem {
  id: string
  name: string
  project_name: string,
  engineering_unit_name: string
}

export interface TunnelPickerQuery {
  search?: string
  page?: number
  pageSize?: number
}

export interface TunnelPickerResult {
  items: TunnelPickerItem[]
  total: number
  page: number
  pageSize: number
}