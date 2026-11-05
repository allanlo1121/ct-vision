import { z } from "zod"
import { roleSummarySchema } from "../role";

export const userRoleQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  keyword: z.string().trim().optional(),
  roleId: z.uuid().optional(),
})

export type UserRoleQuery = z.infer<
  typeof userRoleQuerySchema
>

export const userRoleListItemSchema = z.object({
  userId: z.uuid(),
  email: z.email(),
  displayName: z.string().nullable(),
  roles: z.array(roleSummarySchema),
})

export type UserRoleListItem = z.infer<
  typeof userRoleListItemSchema
>