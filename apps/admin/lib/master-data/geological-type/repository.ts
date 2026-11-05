import { createClient } from "@workspace/supabase/server"
import { fetchAllPages } from "@workspace/supabase/utils"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"

import type {
  GeologicalTypeRepository,
  CreateGeologicalTypeInput,
  UpdateGeologicalTypeInput,
  GeologicalType,
} from "@workspace/master-data/geological-type"
import { geologicalTypeSchema } from "@workspace/master-data/geological-type"

export const geologicalTypeRepository: GeologicalTypeRepository = {
  async findByCode(code) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("geological_types")
      .select("*")
      .eq("code", code)
      .maybeSingle()

    assertNoError(error)

    return data ? geologicalTypeSchema.parse(data) : null
  },

  async findByParentCode(parentCode) {
    const supabase = await createClient()

    let query = supabase
      .schema("master_data")
      .from("geological_types")
      .select("*")

    query =
      parentCode === null
        ? query.is("parent_code", null)
        : query.eq("parent_code", parentCode)

    const { data, error } = await query.order("code")

    assertNoError(error)

    return data ?? []
  },

  async findAll() {
    const supabase = await createClient()

    return fetchAllPages<GeologicalType>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("master_data")
          .from("geological_types")
          .select("*")
          .order("code")
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },

  async findOptions(parentCode: string | null) {
    const supabase = await createClient()

    let query = supabase
      .schema("master_data")
      .from("geological_types")
      .select("code,name")

    query =
      parentCode === null
        ? query.is("parent_code", null)
        : query.eq("parent_code", parentCode)

    const { data, error } = await query.order("code")

    assertNoError(error)

    return data ?? []
  },

  async create(input: CreateGeologicalTypeInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating Geological Type with input:", input)

    const { data, error } = await supabase
      .schema("master_data")
      .from("geological_types")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log("Geological Type creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建地质类型失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(code: string, input: UpdateGeologicalTypeInput): Promise<void> {
    const supabase = await createClient()

    console.log("Updating Geological Type with input:", code, input)

    const { data, error, count } = await supabase
      .schema("master_data")
      .from("geological_types")
      .update(input, { count: "exact" })
      .eq("code", code)
      .select("*")
      .maybeSingle()

    console.log("Geological Type update result:", { data, error, count })

    assertNoError(error)

    if (count === 0) {
      throw new AppError({
        message: "更新地质类型失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(code: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("master_data")
      .from("geological_types")
      .delete()
      .eq("code", code)

    assertNoError(error)
  },
}
