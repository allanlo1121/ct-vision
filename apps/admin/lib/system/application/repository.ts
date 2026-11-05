import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"

import type {
  ApplicationRepository,
  CreateApplicationInput,
  UpdateApplicationInput,
  Application,
} from "@workspace/system/application"
import {
  applicationSchema,
  createApplicationSchema,
} from "@workspace/system/application"
import { z } from "zod"

export const applicationRepository: ApplicationRepository = {
  async findByCode(code) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("applications")
      .select("*")
      .eq("code", code)
      .maybeSingle()
      .overrideTypes<Application>()

    assertNoError(error)

    return data ? applicationSchema.parse(data) : null
  },

  async findAll() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("applications")
      .select("*")
      .order("sort_order")

    console.log("applications data:", data)
    console.log("applications error:", error)

    assertNoError(error)

    return data ?? []
  },

  async findOptions() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("applications")
      .select("code, name")
      .order("sort_order")

    assertNoError(error)

    return data ?? []
  },

  async create(input: CreateApplicationInput): Promise<Application> {
    const supabase = await createClient()
    console.log("Creating application with input:", input)

    const { data, error } = await supabase
      .schema("system")
      .from("applications")
      .insert(input)
      .select("*")
      .single()

    console.log("Application creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建应用失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }

    return applicationSchema.parse(data)
  },
  async update(
    code: string,
    input: UpdateApplicationInput
  ): Promise<Application> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("applications")
      .update(input)
      .eq("code", code)
      .select("*")
      .single()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新应用失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }

    return applicationSchema.parse(data)
  },
  async delete(code) {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("system")
      .from("applications")
      .delete()
      .eq("code", code)

    assertNoError(error)
  },
}
