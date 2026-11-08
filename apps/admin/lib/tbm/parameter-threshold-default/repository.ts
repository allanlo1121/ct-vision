
import { createClient } from "@workspace/supabase/server"
import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import {
  type ParameterThresholdDefaultRepository,
  type CreateParameterThresholdDefaultInput,
  type UpdateParameterThresholdDefaultInput,
  type ParameterThresholdDefault,
  type ParameterThresholdDefaultWithBase,
  parameterThresholdDefaultSchema,
  parameterThresholdDefaultWithBaseSchema
} from "@workspace/tbm/parameter"

import { ENTITY } from "./constants"

export const parameterThresholdDefaultRepository: ParameterThresholdDefaultRepository = {
  async findById(id: number): Promise<ParameterThresholdDefault | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("parameter_threshold_defaults")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? parameterThresholdDefaultSchema.parse(data) : null
  },

  async findByParameterCode(
    parameterCode: string
  ): Promise<ParameterThresholdDefault[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("parameter_threshold_defaults")
      .select("*")
      .eq("parameter_code", parameterCode)

    assertNoError(error)

    return parameterThresholdDefaultSchema.array().parse(data ?? [])
  },



  async findAll(): Promise<ParameterThresholdDefault[]> {
    const supabase = await createClient()

    return fetchAllPages<ParameterThresholdDefault>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("tbm")
          .from("parameter_threshold_defaults")
          .select("*")
          .order("sort_order")
          .range(from, to)

        assertNoError(error)

        return parameterThresholdDefaultSchema.array().parse(data ?? [])
      },
    })
  },

  async listAll(
    subsystemCode: string | null = null
  ): Promise<ParameterThresholdDefaultWithBase[]> {
    const supabase = await createClient()

    let query = supabase
      .schema("tbm")
      .from("parameter_threshold_defaults")
      .select(`
      *,
      parameter:parameters!inner(
        code,
        subsystem_code,
        name,
        data_type,
        digits,
        unit,
        description,
        is_disabled,
        sort_order
      )
    `)

    if (subsystemCode) {
      query = query.eq("parameter.subsystem_code", subsystemCode)
    }

    const { data, error } = await query
      .order("sort_order", {
        referencedTable: "parameter",
        ascending: true,
      })
      .order("id", { ascending: true })

    assertNoError(error)

    return parameterThresholdDefaultWithBaseSchema.array().parse(data ?? [])
  },

  async create(input: CreateParameterThresholdDefaultInput): Promise<void> {
    const supabase = await createClient()


    const { data, error } = await supabase
      .schema("tbm")
      .from("parameter_threshold_defaults")
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
    input: UpdateParameterThresholdDefaultInput
  ): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("parameter_threshold_defaults")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: `更新${ENTITY.label}失败：记录不存在或未返回数据`,
        code: "INTERNAL_ERROR",
      })
    }
  },
  async upsertMany(inputs): Promise<void> {
    if (inputs.length === 0) return
    const supabase = await createClient()
    const { error } = await supabase
      .schema("tbm")
      .from("parameter_threshold_defaults")
      .upsert(inputs, {
        onConflict: "parameter_code,severity_code",
      })

    assertNoError(error)
  },

  async delete(id: number): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("tbm")
      .from("parameter_threshold_defaults")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}

