import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"

import type {
  DictionaryItemRepository,
  CreateDictionaryItemInput,
  UpdateDictionaryItemInput,
  DictionaryItem,
} from "@workspace/master-data/dictionary-item"
import type { DictionaryItemWithType } from "@workspace/master-data/dictionary-item"
import {
  dictionaryItemSchema 
} from "@workspace/master-data/dictionary-item"
import { z } from "zod"
import { CodeNameOption } from "@workspace/shared"

export const dictionaryItemRepository: DictionaryItemRepository = {
  async findByCode(code: string): Promise<DictionaryItem | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("dictionary_items")
      .select("*")
      .eq("code", code)
      .maybeSingle()

    assertNoError(error)

    return data ? dictionaryItemSchema.parse(data) : null
  },

  async findAll(): Promise<DictionaryItem[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("dictionary_items")
      .select("*")
      .order("code")


    assertNoError(error)

    return data ?? []
  },
  async findAllWithType(): Promise<DictionaryItemWithType[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("dictionary_items")
      .select("*, dictionary_type:dictionary_type_code(*)")
      .order("code")

    assertNoError(error)

    return data
      ? data.map((item) => {
          const parsedItem = dictionaryItemSchema.parse(item)
          return {
            ...parsedItem,
            dictionary_type: item.dictionary_type,
          }
        })
      : []
  },

  async findOptions(): Promise<CodeNameOption[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("dictionary_items")
      .select("code, name")
      .order("code")

    assertNoError(error)

    return data ?? []
  },
  async findOptionsByType(typeCode: string): Promise<CodeNameOption[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("dictionary_items")
      .select("code, name")
      .eq("dictionary_type_code", typeCode)
      .order("code")

    assertNoError(error)

    return data ?? []
  },
  async create(input: CreateDictionaryItemInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating DictionaryItem with input:", input)

    const { data, error } = await supabase
      .schema("master_data")
      .from("dictionary_items")
      .insert(input)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建应用失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(code: string, input: UpdateDictionaryItemInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("master_data")
      .from("dictionary_items")
      .update(input)
      .eq("code", code)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新应用失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(code: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("master_data")
      .from("dictionary_items")
      .delete()
      .eq("code", code)

    assertNoError(error)
  },
}
