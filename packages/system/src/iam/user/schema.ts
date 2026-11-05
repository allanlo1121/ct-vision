import { z } from "zod"
import { roleSummarySchema } from "../role"

export const userQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  pageSize: z.coerce.number().int().min(1).max(100).default(20),

  keyword: z
    .string()
    .trim()
    .transform((value) => value || undefined)
    .optional(),

  roleId: z.uuid().optional(),
})

export type UserQuery = z.output<typeof userQuerySchema>



export const userListItemSchema = z.object({
  id: z.uuid(),
  email: z.email().nullable(),
  displayName: z.string().nullable(),
  avatarPath: z.string().nullable(),
  createdAt: z.iso.datetime({ offset: true }),
  lastSignInAt: z.iso.datetime({ offset: true }).nullable(),

  roles: z.array(roleSummarySchema),
})

export type UserListItem = z.infer<typeof userListItemSchema>
