import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  MqttUserRepository,
  CreateMqttUserRecordInput,
  UpdateMqttUserInput,
  MqttUser,
} from "@workspace/mqtt/user"

import { mqttUserSchema } from "@workspace/mqtt/user"

export const mqttUserRepository: MqttUserRepository = {
  async findById(id: number): Promise<MqttUser | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("mqtt")
      .from("users")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? mqttUserSchema.parse(data) : null
  },

  async findByUsername(username: string): Promise<MqttUser | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("mqtt")
      .from("users")
      .select("*")
      .eq("username", username)
      .maybeSingle()

    assertNoError(error)

    return data ? mqttUserSchema.parse(data) : null
  },

  async findAll(): Promise<MqttUser[]> {
    const supabase = await createClient()

    return fetchAllPages<MqttUser>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("mqtt")
          .from("users")
          .select(
            `
            id,
            username,
            is_superuser,
            is_disabled,
            sort_order,
            created_at,
            updated_at,
            created_by,
            updated_by
          `
          )
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },

  async create(input: CreateMqttUserRecordInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("mqtt")
      .from("users")
      .insert(input)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建用户失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(id:number,input: UpdateMqttUserInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("mqtt")
      .from("users")
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
      .from("users")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}
