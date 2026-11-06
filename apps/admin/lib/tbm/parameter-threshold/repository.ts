import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  ParameterThresholdRepository,
  CreateParameterThresholdInput,
  UpdateParameterThresholdInput,
  ParameterThreshold,
  ParameterThresholdListRow,
} from "@workspace/tbm/parameter"

import { parameterThresholdSchema } from "@workspace/tbm/parameter"

export const parameterThresholdRepository: ParameterThresholdRepository = {
  async findById(id: number): Promise<ParameterThreshold | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameter_threshold_rules")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? parameterThresholdSchema.parse(data) : null
  },

  async findByTbmParameterId(
    tbmParameterId: number
  ): Promise<ParameterThreshold | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameter_threshold_rules")
      .select("*")
      .eq("tbm_parameter_id", tbmParameterId)
      .maybeSingle()

    assertNoError(error)

    return data ? parameterThresholdSchema.parse(data) : null
  },

  async findByTbmCodes(tbmCodes: string[]): Promise<ParameterThresholdListRow[]> {
    const supabase = await createClient()

    // 1. 查询 TBM 对应的参数 ID
    const { data, error } = await supabase
      .schema("tbm")
      .from("v_parameter_threshold_list")
      .select("*")
      .in("tbm_code", tbmCodes)

    assertNoError(error)

    return data ?? []
  },

  async findAll(): Promise<ParameterThreshold[]> {
    const supabase = await createClient()

    return fetchAllPages<ParameterThreshold>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("tbm")
          .from("tbm_parameter_threshold_rules")
          .select("*")
          .order("sort_order")
          .range(from, to)

        assertNoError(error)

        return parameterThresholdSchema.array().parse(data ?? [])
      },
    })
  },

  async create(input: CreateParameterThresholdInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating tbm parameter threshold with input:", input)

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameter_threshold_rules")
      .insert(input)
      .select("*")
      .maybeSingle()


    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建隧道风险点数据失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(
    id: number,
    input: UpdateParameterThresholdInput
  ): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameter_threshold_rules")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新隧道风险点数据失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(id: number): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("tbm")
      .from("tbm_parameter_threshold_rules")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}

