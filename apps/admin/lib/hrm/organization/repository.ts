import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"
import { fetchAllPages } from "@workspace/supabase/utils"

import type {
  OrganizationRepository,
  CreateOrganizationInput,
  UpdateOrganizationInput,
  Organization,
  ImportOrganizationInput,
} from "@workspace/hrm/organization"
import type { OrganizationTreeNode } from "@workspace/hrm/organization"

import { organizationSchema } from "@workspace/hrm/organization"

export const organizationRepository: OrganizationRepository = {
  async findById(id: string): Promise<Organization | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("hrm")
      .from("organizations")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? organizationSchema.parse(data) : null
  },
  async findByCode(code: string): Promise<Organization | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("hrm")
      .from("organizations")
      .select("*")
      .eq("code", code)
      .maybeSingle()

    assertNoError(error)

    return data ? organizationSchema.parse(data) : null
  },

  async findAll(): Promise<Organization[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("hrm")
      .from("organizations")
      .select("*")
      .order("code")

    assertNoError(error)

    return data ? data.map((item) => organizationSchema.parse(item)) : []
  },
  async findByParentId(parentId: string | null) {
    const supabase = await createClient()

    let query = supabase.schema("hrm").from("organizations").select("*")

    if (parentId === null) {
      query = query.is("parent_id", null)
    } else {
      query = query.eq("parent_id", parentId)
    }

    const { data, error } = await query.order("sort_order", { ascending: true })

    assertNoError(error)

    return data ? data.map((item) => organizationSchema.parse(item)) : []
  },

  async findAllForImport() {
    const supabase = await createClient()

    return fetchAllPages<{ id: string; external_id: string | null }>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("hrm")
          .from("organizations")
          .select("id, external_id")
          .range(from, to)

        assertNoError(error)

        return data ?? []
      },
    })
  },
  async findAllForTree(): Promise<OrganizationTreeNode[]> {
    const supabase = await createClient()

    return fetchAllPages<OrganizationTreeNode>({
      fetchPage: async (from, to) => {
        const { data, error } = await supabase
          .schema("hrm")
          .from("organizations")
          .select("id, parent_id, name, sort_order, is_disabled")
          .order("sort_order", { ascending: true })
          .order("id", { ascending: true })
          .range(from, to)

        assertNoError(error)


        return (data ?? []).map((org) => ({
          id: org.id,
          parentId: org.parent_id,
          name: org.name,
          sortOrder: org.sort_order,
          isDisabled: org.is_disabled,
        }))
      },
    })
  },

  async create(input: CreateOrganizationInput): Promise<void> {
    const supabase = await createClient()


    const { data, error } = await supabase
      .schema("hrm")
      .from("organizations")
      .insert(input)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建组织失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async update(id: string, input: UpdateOrganizationInput): Promise<void> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("hrm")
      .from("organizations")
      .update(input)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新组织失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async delete(id: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("hrm")
      .from("organizations")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
  async importBatch(inputs: ImportOrganizationInput[]): Promise<void> {
    console.log("Importing organizations with inputs:", inputs)
    const supabase = await createClient()

    const { error } = await supabase
      .schema("hrm")
      .from("organizations")
      .insert(inputs)

    assertNoError(error)
  },
}
