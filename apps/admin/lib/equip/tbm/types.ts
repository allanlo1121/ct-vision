import { CodeNameOption } from "@workspace/shared"

export interface TbmImportRow {
  code: string

  name: string
  tbm_type_code: string

  diameter: number | null
}



export interface TbmOptions {
  tbmTypeOptions: CodeNameOption[]

}
