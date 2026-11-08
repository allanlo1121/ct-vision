import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"

import type {
  TbmRepository,
  CreateTbmInput,
  UpdateTbmInput,
  Tbm,
  ImportTbmInput,
} from "@workspace/tbm/tbm"

import { tbmSchema } from "@workspace/tbm/tbm"

export const tbmRepository: TbmRepository = {
  async findByCode(code: string): Promise<Tbm | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbms")
      .select("*")
      .eq("code", code)
      .maybeSingle()

    assertNoError(error)

    return data ? tbmSchema.parse(data) : null
  },

  async findFirst(): Promise<Tbm | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbms")
      .select("*")
      .order("code")
      .limit(1)
      .maybeSingle()

    assertNoError(error)

    return data
  },

  async findAll(): Promise<Tbm[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbms")
      .select("*")
      .order("code")

    assertNoError(error)

    return data ? data.map((item) => tbmSchema.parse(item)) : []
  },
  async findByDeviceId(deviceId: string): Promise<Tbm | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbms")
      .select("*")
      .eq("device_id", deviceId)
      .maybeSingle()

    assertNoError(error)

    return data ? tbmSchema.parse(data) : null
  },

  async create(input: CreateTbmInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating TBM with input:", input)

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbms")
      .insert(input)
      .select("*")
      .maybeSingle()

    // console.log("TBM creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建TBM失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(code: string, input: UpdateTbmInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbms")
      .update(input)
      .eq("code", code)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新TBM失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(code: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("tbm")
      .from("tbms")
      .delete()
      .eq("code", code)

    assertNoError(error)
  },
  async importBatch(inputs: ImportTbmInput[]): Promise<void> {
    console.log("Importing TBMs with inputs:", inputs)
    const supabase = await createClient()

    const { error } = await supabase.schema("tbm").from("tbms").insert(inputs)

    assertNoError(error)
  },
}
