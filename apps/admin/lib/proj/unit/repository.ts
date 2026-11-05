import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  EngineeringUnitRepository,
  CreateEngineeringUnitInput,
  UpdateEngineeringUnitInput,
  EngineeringUnit,
} from "@workspace/proj/unit"

import { engineeringUnitSchema } from "@workspace/proj/unit"

export const engineeringUnitRepository: EngineeringUnitRepository = {
  async findById(id: string): Promise<EngineeringUnit | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("proj")
      .from("engineering_units")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? engineeringUnitSchema.parse(data) : null
  },

  async findAll(): Promise<EngineeringUnit[]> {
    const supabase = await createClient()

    return fetchAllPages<EngineeringUnit>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("proj")
          .from("engineering_units")
          .select("*")
          .order("sort_order")
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },
  async findByProjectId(projectId: string): Promise<EngineeringUnit[]> {
    const supabase = await createClient()

    let query = supabase
      .schema("proj")
      .from("engineering_units")
      .select("*")
      .eq("project_id", projectId)

    const { data, error } = await query.order("sort_order", { ascending: true })

    assertNoError(error)

    return data ? data.map((item) => engineeringUnitSchema.parse(item)) : []
  },

  async create(input: CreateEngineeringUnitInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating Engineering Unit with input:", input)

    const { data, error } = await supabase
      .schema("proj")
      .from("engineering_units")
      .insert(input)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建工程单位失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(id: string, input: UpdateEngineeringUnitInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("proj")
      .from("engineering_units")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新工程单位失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(id: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("proj")
      .from("engineering_units")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}
