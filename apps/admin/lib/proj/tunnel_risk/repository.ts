import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  RiskRepository,
  CreateRiskInput,
  UpdateRiskInput,
  Risk,
} from "@workspace/proj/tunnel"

import { riskSchema } from "@workspace/proj/tunnel"

export const riskRepository: RiskRepository = {
  async findById(id: string): Promise<Risk | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnel_risks")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? riskSchema.parse(data) : null
  },

  async findAll(): Promise<Risk[]> {
    const supabase = await createClient()

    return fetchAllPages<Risk>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("proj")
          .from("tunnel_risks")
          .select("*")
          .order("sort_order")
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },
  async findByTunnelId(tunnelId: string): Promise<Risk[]> {
    const supabase = await createClient()

    let query = supabase
      .schema("proj")
      .from("tunnel_risks")
      .select("*")
      .eq("tunnel_id", tunnelId)

    const { data, error } = await query.order("start_chainage", { ascending: true })

    assertNoError(error)

    return data ? data.map((item) => riskSchema.parse(item)) : []
  },

  async create(input: CreateRiskInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating Project with input:", input)

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnel_risks")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log("Project creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建隧道风险点数据失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(id: string, input: UpdateRiskInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnel_risks")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新隧道风险点数据失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(id: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("proj")
      .from("tunnel_risks")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}
