import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"

import type {
  CountryRepository,
  CreateCountryInput,
  UpdateCountryInput,
} from "@workspace/master-data/country"
import { countrySchema } from "@workspace/master-data/country"

export const countryRepository: CountryRepository = {
  async findByCode(code) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("countries")
      .select("*")
      .eq("code", code)
      .maybeSingle()

    assertNoError(error)

    return data ? countrySchema.parse(data) : null
  },

  async findAll() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("countries")
      .select("*")
      .order("code")

    assertNoError(error)

    return data ?? []
  },

  async findOptions() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("countries")
      .select("code, name")
      .order("code")

    assertNoError(error)

    return data ?? []
  },

  async create(input: CreateCountryInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating Country with input:", input)

    const { data, error } = await supabase
      .schema("master_data")
      .from("countries")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log("Country creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建国家失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(code: string, input: UpdateCountryInput): Promise<void> {
    const supabase = await createClient()

    console.log("Updating Country with input:", code, input)

    const { data, error, count } = await supabase
      .schema("master_data")
      .from("countries")
      .update(input, { count: "exact" })
      .eq("code", code)
      .select("*")
      .maybeSingle()

    console.log("Country update result:", { data, error, count })

    assertNoError(error)

    if (count === 0) {
      throw new AppError({
        message: "更新国家失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(code: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("master_data")
      .from("countries")
      .delete()
      .eq("code", code)

    assertNoError(error)
  },
}
