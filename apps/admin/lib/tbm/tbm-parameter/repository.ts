import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  TbmParameterRepository,
  CreateTbmParameterInput,
  UpdateTbmParameterInput,
  ImportTbmParameterInput,
  TbmParameter,
} from "@workspace/tbm/parameter"
import type { TbmParameterWithBase } from "@workspace/tbm/parameter"

import { tbmParameterSchema } from "@workspace/tbm/parameter"
import { parameterBaseSchema } from "@workspace/tbm/parameter"

export const tbmParameterRepository: TbmParameterRepository = {
  async findById(id: number): Promise<TbmParameter | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameters")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? tbmParameterSchema.parse(data) : null
  },

  async findAll(): Promise<TbmParameter[]> {
    const supabase = await createClient()

    return fetchAllPages<TbmParameter>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("tbm")
          .from("tbm_parameters")
          .select("*")
          .order("id")
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },
  async findByTbmCode(tbmCode: string): Promise<TbmParameterWithBase[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameters")
      .select(
        `
      *,
      parameter:parameters!inner(
        code,
        subsystem_code,
        name,
        data_type,
        digits,
        unit,
        description,
        is_disabled)
    `
      )
      .eq("tbm_code", tbmCode)
      .order("id")

    assertNoError(error)

    return data
      ? data.map((item) => {
          return {
            ...tbmParameterSchema.parse(item),
            parameter: parameterBaseSchema.parse(item.parameter),
          }
        })
      : []
  },

  async create(input: CreateTbmParameterInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating TBM Parameter with input:", input)

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameters")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log("TBM Parameter creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建TBM参数失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(id: number, input: UpdateTbmParameterInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameters")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新TBM参数失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(id: number): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("tbm")
      .from("tbm_parameters")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
  async import(
    tbmCode: string,
    input: ImportTbmParameterInput[]
  ): Promise<void> {
    const supabase = await createClient()

    // 1. 删除当前 TBM 的所有绑定参数
    const { error: deleteError } = await supabase
      .schema("tbm")
      .from("tbm_parameters")
      .delete()
      .eq("tbm_code", tbmCode)
    console.log("Deleting TBM Parameters for tbmCode:", tbmCode)
    console.log("Delete error:", deleteError)

    assertNoError(deleteError)

    // 2. 重新导入
    if (input.length === 0) return

    const { error: insertError } = await supabase
      .schema("tbm")
      .from("tbm_parameters")
      .insert(
        input.map((item) => ({
          ...item,
          tbm_code: tbmCode,
        }))
      )

    console.log("Insert error:", insertError)
    assertNoError(insertError)
  },
  async syncTbmRealdataTable(tbmCode: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase.schema("tbm").rpc("sync_realdata_table", {
      p_tbm_code: tbmCode,
    })

    assertNoError(error)
  },
}
