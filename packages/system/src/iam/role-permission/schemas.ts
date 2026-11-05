import { z } from "zod"
import { roleSchema } from "../role/schemas"
import { permissionBaseSchema } from "../permission/schemas"

export const roleWithPermissionsSchema = roleSchema.extend({
  permissions: z.array(permissionBaseSchema),
})

export type RoleWithPermissions = z.infer<typeof roleWithPermissionsSchema>
