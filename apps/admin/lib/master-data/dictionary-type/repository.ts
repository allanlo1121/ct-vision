import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"

import type {
  DictionaryTypeRepository,
  CreateDictionaryTypeInput,
  UpdateDictionaryTypeInput,
  DictionaryType,
} from "@workspace/master-data/dictionary-type"
import {
  dictionaryTypeSchema,
  createDictionaryTypeSchema,
} from "@workspace/master-data/dictionary-type"
import { z } from "zod"

export const dictionaryTypeRepository: DictionaryTypeRepository = {
  async findByCode(code) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("dictionary_types")
      .select("*")
      .eq("code", code)
      .maybeSingle()

    assertNoError(error)

    return data ? dictionaryTypeSchema.parse(data) : null
  },

  async findAll() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("dictionary_types")
      .select("*")
      .order("code")

    console.log("dictionary_types data:", data)
    console.log("dictionary_types error:", error)

    assertNoError(error)

    return data ?? []
  },

  async findOptions() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("dictionary_types")
      .select("code, name")
      .order("code")


    assertNoError(error)

    return data ?? []
  },

  async create(input: CreateDictionaryTypeInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating DictionaryType with input:", input)

    const { data, error } = await supabase
      .schema("master_data")
      .from("dictionary_types")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log("DictionaryType creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建字典类型失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(code: string, input: UpdateDictionaryTypeInput): Promise<void> {
    const supabase = await createClient()

    console.log("Updating DictionaryType with input:", code, input)

    const {data, error, count } = await supabase
      .schema("master_data")
      .from("dictionary_types")
      .update(input, { count: "exact" })
      .eq("code", code)
      .select("*")
      .maybeSingle()

    console.log("DictionaryType update result:", { data, error, count })

    assertNoError(error)

    if (count === 0) {
      throw new AppError({
        message: "更新字典类型失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(code: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("master_data")
      .from("dictionary_types")
      .delete()
      .eq("code", code)

    assertNoError(error)
  },
}
