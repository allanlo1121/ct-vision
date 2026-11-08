import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  TunnelRepository,
  CreateTunnelInput,
  UpdateTunnelInput,
  Tunnel,
} from "@workspace/proj/tunnel"

import { tunnelSchema } from "@workspace/proj/tunnel"

export const tunnelRepository: TunnelRepository = {
  async findById(id: string): Promise<Tunnel | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? tunnelSchema.parse(data) : null
  },

  async findAll(): Promise<Tunnel[]> {
    const supabase = await createClient()

    return fetchAllPages<Tunnel>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("proj")
          .from("tunnels")
          .select("*")
          .order("sort_order")
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },
  async findBySectionId(engineeringUnitId: string): Promise<Tunnel[]> {
    const supabase = await createClient()

    let query = supabase
      .schema("proj")
      .from("tunnels")
      .select("*")
      .eq("engineering_unit_id", engineeringUnitId)

    const { data, error } = await query.order("sort_order", { ascending: true })

    assertNoError(error)

    return data ? data.map((item) => tunnelSchema.parse(item)) : []
  },

  async create(input: CreateTunnelInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating Project with input:", input)

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .insert(input)
      .select("*")
      .maybeSingle()


    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建项目失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(id: string, input: UpdateTunnelInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnels")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新项目失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(id: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("proj")
      .from("tunnels")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}



import type {
  TunnelPickerItem,
  TunnelPickerQuery,
  TunnelPickerResult,
} from "./types"

export async function listTunnelPicker(
  query: TunnelPickerQuery = {}
): Promise<TunnelPickerResult> {
  const {
    search = "",
    page = 1,
    pageSize = 20,
  } = query

  const supabase = await createClient()

  const safePage = Math.max(1, page)
  const safePageSize = Math.min(100, Math.max(1, pageSize))
  const from = (safePage - 1) * safePageSize

  let request = supabase
    .schema("tbm")
    .from("v_assignable_tunnels")
    .select(
      "id, name, project_name, engineering_unit_name",
      { count: "exact" }
    )

  if (search.trim()) {
    const keyword = `%${search.trim()}%`

    request = request.or(
      `name.ilike.${keyword},engineering_unit_name.ilike.${keyword},project_name.ilike.${keyword}`
    )
  }

  const { data, count, error } = await request
    .order("name")
    .order("id")
    .range(from, from + safePageSize - 1)

  if (error) throw error

  return {
    items: (data ?? []).map((item) => ({
      id: item.id,
      name: item.name,
      engineering_unit_name: item.engineering_unit_name,
      project_name: item.project_name
    })),
    total: count ?? 0,
    page: safePage,
    pageSize: safePageSize,
  }
}


export async function getTunnelPickerById(
  id: string
): Promise<TunnelPickerItem | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .schema("proj")
    .from("tunnels")
    .select(`
      id,
      name,
      engineering_unit:engineering_units!inner (
        name,
        project:projects!inner (
          name
        )
      )
    `)
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return {
    id: data.id,
    name: data.name,
    engineering_unit_name: data.engineering_unit.name,
    project_name: data.engineering_unit.project.name,
  }
}