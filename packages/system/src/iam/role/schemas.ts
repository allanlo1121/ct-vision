import { z } from "zod"

import { paginationQuerySchema } from "@workspace/shared"

export const roleSchema = z.object({
  id: z.uuid(),

  code: z.string().min(1).max(100),
  name: z.string().min(1).max(100),
  description: z.string().nullable(),

  sort_order: z.number().int(),
  is_disabled: z.boolean(),

  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }).nullable(),

  created_by: z.uuid().nullable(),
  updated_by: z.uuid().nullable(),
})

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

export const updateRoleSchema = createRoleSchema.omit({ code: true }).partial()

export type Role = z.infer<typeof roleSchema>
export type CreateRoleInput = z.input<typeof createRoleSchema>
export type UpdateRoleInput = z.input<typeof updateRoleSchema>

export const roleQuerySchema = paginationQuerySchema.extend({
  keyword: z.string().trim().optional(),

  is_disabled: z.boolean().optional(),
})

export type RoleQuery = z.output<typeof roleQuerySchema>
