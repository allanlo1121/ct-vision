import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  ParameterRepository,
  CreateParameterInput,
  UpdateParameterInput,
  Parameter,
} from "@workspace/tbm/parameter"

import { parameterSchema } from "@workspace/tbm/parameter"

export const parameterRepository: ParameterRepository = {
  async findByCode(code: string): Promise<Parameter | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("parameters")
      .select("*")
      .eq("code", code)
      .maybeSingle()

    assertNoError(error)

    return data ? parameterSchema.parse(data) : null
  },

  async findAll(): Promise<Parameter[]> {
    const supabase = await createClient()

    return fetchAllPages<Parameter>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("tbm")
          .from("parameters")
          .select("*")
          .order("code")
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },
  async findBySubsystemCode(subsystemCode: string): Promise<Parameter[]> {
    const supabase = await createClient()

    let query = supabase
      .schema("tbm")
      .from("parameters")
      .select("*")
      .eq("subsystem_code", subsystemCode)

    const { data, error } = await query.order("code", { ascending: true })

    assertNoError(error)

    return data ? data.map((item) => parameterSchema.parse(item)) : []
  },

  async create(input: CreateParameterInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating TBM Parameter with input:", input)

    const { data, error } = await supabase
      .schema("tbm")
      .from("parameters")
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
  async update(code: string, input: UpdateParameterInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("parameters")
      .update(input)
      .eq("code", code)
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
  async delete(code: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("tbm")
      .from("parameters")
      .delete()
      .eq("code", code)

    assertNoError(error)
  },
}
