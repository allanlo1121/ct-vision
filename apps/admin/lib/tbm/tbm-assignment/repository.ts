import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  TbmAssignmentRepository,
  CreateTbmAssignmentInput,
  UpdateTbmAssignmentInput,
  TbmAssignment,
  TbmAssignmentListRow
} from "@workspace/tbm/tbm"


import { tbmAssignmentSchema } from "@workspace/tbm/tbm"


export const tbmAssignmentRepository: TbmAssignmentRepository = {
  async findById(id: string): Promise<TbmAssignment | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("assignments")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? tbmAssignmentSchema.parse(data) : null
  },

  async findByTbmCode(tbmCode: string): Promise<TbmAssignment[]> {
    const supabase = await createClient()

    let query = supabase
      .schema("tbm")
      .from("assignments")
      .select("*")
      .eq("tbm_code", tbmCode)

    const { data, error } = await query.order("sort_order", { ascending: true })

    assertNoError(error)

    return data ? data.map((item) => tbmAssignmentSchema.parse(item)) : []
  },

  async findCurrent(tbmCode: string): Promise<TbmAssignment | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("assignments")
      .select("*")
      .eq("tbm_code", tbmCode)
      .order("sort_order", { ascending: true })
      .maybeSingle()

    assertNoError(error)

    return data ? tbmAssignmentSchema.parse(data) : null
  },

  async listCurrent(): Promise<TbmAssignment[]> {
    const supabase = await createClient()

    let query = supabase.schema("tbm").from("assignments").select("*")

    const { data, error } = await query.order("tbm_code", { ascending: true })

    assertNoError(error)

    return data ? data.map((item) => tbmAssignmentSchema.parse(item)) : []
  },


  async listAll(): Promise<TbmAssignmentListRow[]> {
    const supabase = await createClient()

    return fetchAllPages<TbmAssignmentListRow>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("tbm")
          .from("v_tbm_assignments_list")
          .select("*")
          .order("tbm_code")
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },
  async findByTunnelId(tunnelId: string): Promise<TbmAssignment[]> {
    const supabase = await createClient()

    let query = supabase
      .schema("tbm")
      .from("assignments")
      .select("*")
      .eq("tunnel_id", tunnelId)

    const { data, error } = await query.order("sort_order", { ascending: true })

    assertNoError(error)

    return data ? data.map((item) => tbmAssignmentSchema.parse(item)) : []
  },

  async create(input: CreateTbmAssignmentInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating Project with input:", input)

    const { data, error } = await supabase
      .schema("tbm")
      .from("assignments")
      .insert(input)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建隧道管片数据失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(id: string, input: UpdateTbmAssignmentInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("tbm")
      .from("assignments")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新隧道管片数据失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(id: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("tbm")
      .from("assignments")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}
