import { z } from "zod"

import { auditSchema, paginationQuerySchema } from "@workspace/shared"

export const roleBaseSchema = z.object({
  id: z.uuid(),

  code: z.string().min(1).max(100),
  name: z.string().min(1).max(100),
  description: z.string().nullable(),

  sort_order: z.number().int(),
  is_disabled: z.boolean(),
})

export const roleSchema = roleBaseSchema.safeExtend(auditSchema.shape)

export const createRoleSchema = roleSchema
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
    created_by: true,
    updated_by: true,
  })
  .extend({
    sort_order: z.number().int(),
    is_disabled: z.boolean(),
  })

export const updateRoleSchema = createRoleSchema.partial()

export type RoleBase = z.infer<typeof roleBaseSchema>
export type Role = z.infer<typeof roleSchema>
export type CreateRoleInput = z.input<typeof createRoleSchema>
export type UpdateRoleInput = z.input<typeof updateRoleSchema>

export const roleQuerySchema = paginationQuerySchema.extend({
  keyword: z.string().trim().optional(),

  is_disabled: z.boolean().optional(),
})

export type RoleQuery = z.output<typeof roleQuerySchema>

export const roleSummarySchema = roleSchema.pick({
  id: true,
  code: true,
  name: true,
})

export type RoleSummary = z.infer<typeof roleSummarySchema>
