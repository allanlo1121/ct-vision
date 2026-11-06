import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  SubsystemRepository,
  CreateSubsystemInput,
  UpdateSubsystemInput,
  Subsystem,
} from "@workspace/tbm/parameter"
import type { CodeNameOption } from "@workspace/shared"

import { subsystemSchema } from "@workspace/tbm/parameter"

export const subsystemRepository: SubsystemRepository = {
  async findByCode(code: string): Promise<Subsystem | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("subsystems")
      .select("*")
      .eq("code", code)
      .maybeSingle()

    assertNoError(error)

    return data ? subsystemSchema.parse(data) : null
  },

  async findAll(): Promise<Subsystem[]> {
    const supabase = await createClient()

    return fetchAllPages<Subsystem>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("tbm")
          .from("subsystems")
          .select("*")
          .order("code", { ascending: true })
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },

  async findOptions(): Promise<CodeNameOption[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("subsystems")
      .select("code, name")

    assertNoError(error)

    return (data ?? []).map((item) => ({
      code: item.code,
      name: item.name,
    }))
  },

  async create(input: CreateSubsystemInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating Subsystem with input:", input)

    const { data, error } = await supabase
      .schema("tbm")
      .from("subsystems")
      .insert(input)
      .select("*")
      .maybeSingle()


    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建子系统失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(code: string, input: UpdateSubsystemInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("subsystems")
      .update(input)
      .eq("code", code)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新子系统失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(code: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("tbm")
      .from("subsystems")
      .delete()
      .eq("code", code)

    assertNoError(error)
  },
}
