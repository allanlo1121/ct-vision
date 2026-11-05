import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  DeviceRepository,
  CreateDeviceInput,
  UpdateDeviceInput,
  Device,
} from "@workspace/equip/device"

import { deviceSchema } from "@workspace/equip/device"

export const deviceRepository: DeviceRepository = {
  async findById(id: string): Promise<Device | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("equip")
      .from("devices")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? deviceSchema.parse(data) : null
  },

  async findAll(): Promise<Device[]> {
    const supabase = await createClient()

    return fetchAllPages<Device>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("equip")
          .from("devices")
          .select("*")
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },

  async create(input: CreateDeviceInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating Device with input:", input)

    const { data, error } = await supabase
      .schema("equip")
      .from("devices")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log("Device creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建设备失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(id: string, input: UpdateDeviceInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("equip")
      .from("devices")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新设备失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(id: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("equip")
      .from("devices")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}
