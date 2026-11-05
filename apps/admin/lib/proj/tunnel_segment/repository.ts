import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  SegmentRepository,
  CreateSegmentInput,
  UpdateSegmentInput,
  Segment,
} from "@workspace/proj/tunnel"

import { segmentSchema } from "@workspace/proj/tunnel"

export const segmentRepository: SegmentRepository = {
  async findById(id: string): Promise<Segment | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnel_segments")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? segmentSchema.parse(data) : null
  },

  async findAll(): Promise<Segment[]> {
    const supabase = await createClient()

    return fetchAllPages<Segment>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("proj")
          .from("tunnel_segments")
          .select("*")
          .order("sort_order")
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },
  async findByTunnelId(tunnelId: string): Promise<Segment[]> {
    const supabase = await createClient()

    let query = supabase
      .schema("proj")
      .from("tunnel_segments")
      .select("*")
      .eq("tunnel_id", tunnelId)

    const { data, error } = await query.order("sort_order", { ascending: true })

    assertNoError(error)

    return data ? data.map((item) => segmentSchema.parse(item)) : []
  },

  async create(input: CreateSegmentInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating Project with input:", input)

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnel_segments")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log("Project creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建隧道管片数据失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(id: string, input: UpdateSegmentInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("proj")
      .from("tunnel_segments")
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
      .schema("proj")
      .from("tunnel_segments")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}
