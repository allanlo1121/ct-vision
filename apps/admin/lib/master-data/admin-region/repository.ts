import { createClient } from "@workspace/supabase/server"
import { fetchAllPages } from "@workspace/supabase/utils"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"

import type {
  AdminRegionRepository,
  CreateAdminRegionInput,
  UpdateAdminRegionInput,
  AdminRegion,
} from "@workspace/master-data/admin-region"
import { adminRegionSchema } from "@workspace/master-data/admin-region"

export const adminRegionRepository: AdminRegionRepository = {
  async findByCode(code) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("admin_regions")
      .select("*")
      .eq("code", code)
      .maybeSingle()

    assertNoError(error)

    return data ? adminRegionSchema.parse(data) : null
  },

  async findByParentCode(parentCode) {
    const supabase = await createClient()

    let query = supabase.schema("master_data").from("admin_regions").select("*")

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

    return fetchAllPages<AdminRegion>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("master_data")
          .from("admin_regions")
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
      .from("admin_regions")
      .select("code,name")

    query =
      parentCode === null
        ? query.is("parent_code", null)
        : query.eq("parent_code", parentCode)

    const { data, error } = await query.order("code")

    assertNoError(error)

    return data ?? []
  },
  async findByLevel(level: number) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("admin_regions")
      .select("*")
      .eq("level", level)
      .order("code")

    assertNoError(error)

    return data ?? []
  },

  async create(input: CreateAdminRegionInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating Admin Region with input:", input)

    const { data, error } = await supabase
      .schema("master_data")
      .from("admin_regions")
      .insert(input)
      .select("*")
      .maybeSingle()


    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建行政区失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(code: string, input: UpdateAdminRegionInput): Promise<void> {
    const supabase = await createClient()



    const { data, error, count } = await supabase
      .schema("master_data")
      .from("admin_regions")
      .update(input, { count: "exact" })
      .eq("code", code)
      .select("*")
      .maybeSingle()


    assertNoError(error)

    if (count === 0) {
      throw new AppError({
        message: "更新行政区失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(code: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("master_data")
      .from("admin_regions")
      .delete()
      .eq("code", code)

    assertNoError(error)
  },
}
