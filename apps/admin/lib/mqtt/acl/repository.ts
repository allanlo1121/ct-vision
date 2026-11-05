import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  MqttAclRepository,
  CreateMqttAclInput,
  UpdateMqttAclInput,
  MqttAcl,
} from "@workspace/mqtt/acl"

import { mqttAclSchema } from "@workspace/mqtt/acl"

export const mqttAclRepository: MqttAclRepository = {
  async findById(id: number): Promise<MqttAcl | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("mqtt")
      .from("acl")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? mqttAclSchema.parse(data) : null
  },

  async findByUsername(username: string): Promise<MqttAcl[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("mqtt")
      .from("acl")
      .select("*")
      .eq("username", username)

    assertNoError(error)

    return data ? mqttAclSchema.array().parse(data) : []
  },

  async findAll(): Promise<MqttAcl[]> {
    const supabase = await createClient()

    return fetchAllPages<MqttAcl>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("mqtt")
          .from("acl")
          .select("*")
          .range(from, to)

        assertNoError(error)

        return data ? mqttAclSchema.array().parse(data) : []
      },
    })
  },

  async create(input: CreateMqttAclInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating MqttUser with input:", input)

    const { data, error } = await supabase
      .schema("mqtt")
      .from("acl")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log("Device creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建用户失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(id: number, input: UpdateMqttAclInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("mqtt")
      .from("acl")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新用户失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(id: number): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("mqtt")
      .from("acl")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}
