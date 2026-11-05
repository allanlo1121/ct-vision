import { z } from "zod"
import { Constants } from "@workspace/supabase/database"

// 用户获得的权限
export const permissionGrantSchema = z.object({
  module: z.enum(Constants.iam.Enums.permission_module),
  action: z.enum(Constants.iam.Enums.permission_action),
})

export type PermissionGrant = z.infer<
  typeof permissionGrantSchema
>

// 授权上下文
export const authContextSchema = z.object({
  user: z.object({
    userId: z.uuid(),
    email: z.email(),
    displayName: z.string(),
    avatarUrl: z.string().nullable().optional(),
  }),

  roles: z.array(z.string()),
  permissions: z.array(permissionGrantSchema),
})

export type AuthContext = z.infer<typeof authContextSchema>