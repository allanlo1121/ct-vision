import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  ProjectRepository,
  CreateProjectInput,
  UpdateProjectInput,
  Project,
  ImportProjectInput,
} from "@workspace/proj/project"


import { projectSchema } from "@workspace/proj/project"

export const projectRepository: ProjectRepository = {
  async findById(id: string): Promise<Project | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("proj")
      .from("projects")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? projectSchema.parse(data) : null
  },
  async findByCode(code: string): Promise<Project | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("proj")
      .from("projects")
      .select("*")
      .eq("code", code)
      .maybeSingle()

    assertNoError(error)

    return data ? projectSchema.parse(data) : null
  },

  async findAll(): Promise<Project[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("proj")
      .from("projects")
      .select("*")
      .order("code")

    assertNoError(error)

    return data ? data.map((item) => projectSchema.parse(item)) : []
  },
  async findByOrganizationId(organizationId: string | null): Promise<Project[]> {
    const supabase = await createClient()

    let query = supabase.schema("proj").from("projects").select("*")

    if (organizationId === null) {
      query = query.is("organization_id", null)
    } else {
      query = query.eq("organization_id", organizationId)
    }

    const { data, error } = await query.order("sort_order", { ascending: true })

    assertNoError(error)

    return data ? data.map((item) => projectSchema.parse(item)) : []
  },

  async findAllForImport() {
    const supabase = await createClient()

    return fetchAllPages<{ id: string; external_id: string | null }>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("proj")
          .from("projects")
          .select("id, external_id")
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },


  async create(input: CreateProjectInput): Promise<void> {
    const supabase = await createClient()
    console.log("Creating Project with input:", input)

    const { data, error } = await supabase
      .schema("proj")
      .from("projects")
      .insert(input)
      .select("*")
      .maybeSingle()

    console.log("Project creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建项目失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(id: string, input: UpdateProjectInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("proj")
      .from("projects")
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
      .from("projects")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
  async importBatch(inputs: ImportProjectInput[]): Promise<void> {
    console.log("Importing projects with inputs:", inputs)
    const supabase = await createClient()

    const { error } = await supabase
      .schema("proj")
      .from("projects")
      .insert(inputs)

    assertNoError(error)
  },
}
