import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import {
  type TbmParameterThresholdRepository,
  type CreateTbmParameterThresholdInput,
  type UpdateTbmParameterThresholdInput,
  type TbmParameterThreshold,
  type TbmThresholdRuleList,
  type TbmParameterThresholdWithBase,
  tbmParameterThresholdSchema,
  tbmParameterThresholdWithBaseSchema,
  tbmThresholdRuleListSchema
} from "@workspace/tbm/parameter"

import { } from "@workspace/tbm/parameter"

import { ENTITY } from "./constants"


export const tbmParameterThresholdRepository: TbmParameterThresholdRepository = {
  async findById(id: number): Promise<TbmParameterThreshold | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("parameter_thresholds")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? tbmParameterThresholdSchema.parse(data) : null
  },

  async findByTbmParameterId(
    tbmParameterId: number
  ): Promise<TbmParameterThreshold | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("parameter_thresholds")
      .select("*")
      .eq("tbm_parameter_id", tbmParameterId)
      .maybeSingle()

    assertNoError(error)

    return data ? tbmParameterThresholdSchema.parse(data) : null
  },
  async listByTbmCode(
    tbmCode: string,
    subsystemCode: string | null = null
  ): Promise<TbmParameterThresholdWithBase[]> {
    const supabase = await createClient()

    let query = supabase
      .schema("tbm")
      .from("parameter_thresholds")
      .select(`
      *,
      tbm_parameter:tbm_parameters!inner(
        *,
        parameter:parameters!inner(*)
      )
    `)
      .eq("tbm_parameter.tbm_code", tbmCode)

    if (subsystemCode) {
      query = query.eq(
        "tbm_parameter.parameter.subsystem_code",
        subsystemCode
      )
    }

    const { data, error } = await query.order("id")

    assertNoError(error)

    return tbmParameterThresholdWithBaseSchema.array().parse(data ?? [])
  },

  async findByTbmCodes(
    tbmCodes: string[],
    subsystemCode: string | null = null
  ): Promise<TbmThresholdRuleList[]> {
    if (tbmCodes.length === 0) return []

    const supabase = await createClient()

    let query = supabase
      .schema("tbm")
      .from("v_parameter_threshold_rules")
      .select("*")
      .in("tbm_code", tbmCodes)

    if (subsystemCode) {
      query = query.eq("subsystem_code", subsystemCode)
    }

    const { data, error } = await query
      .order("parameter_code")
      .order("severity_code")

    assertNoError(error)

    return tbmThresholdRuleListSchema.array().parse(data ?? [])
  },

  async findAll(): Promise<TbmParameterThreshold[]> {
    const supabase = await createClient()

    return fetchAllPages<TbmParameterThreshold>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("tbm")
          .from("parameter_thresholds")
          .select("*")
          .order("sort_order")
          .range(from, to)

        assertNoError(error)

        return tbmParameterThresholdSchema.array().parse(data ?? [])
      },
    })
  },

  async create(input: CreateTbmParameterThresholdInput): Promise<void> {
    const supabase = await createClient()


    const { data, error } = await supabase
      .schema("tbm")
      .from("parameter_thresholds")
      .insert(input)
      .select("*")
      .maybeSingle()


    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: `创建${ENTITY.label}失败：数据库未返回记录`,
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(
    id: number,
    input: UpdateTbmParameterThresholdInput
  ): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("parameter_thresholds")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: `更新${ENTITY.label}失败：数据库未返回记录`,
        code: "INTERNAL_ERROR",
      })
    }
  },
  async upsertMany(inputs): Promise<void> {
    if (inputs.length === 0) return
    const supabase = await createClient()
    const { error } = await supabase
      .schema("tbm")
      .from("parameter_thresholds")
      .upsert(inputs, {
        onConflict: "tbm_parameter_id,severity_code",
      })

    assertNoError(error)
  },

  async delete(id: number): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("tbm")
      .from("parameter_thresholds")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}

