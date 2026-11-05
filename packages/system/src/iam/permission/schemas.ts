import { z } from "zod"

import { auditSchema, paginationQuerySchema } from "@workspace/shared"
import {
  PERMISSION_MODULES,
  PERMISSION_ACTIONS,
} from "../../constants"

export const permissionBaseSchema = z.object({
  id: z.uuid(),  
  name: z.string().min(1).max(100),
  module: z.enum(PERMISSION_MODULES),
  action: z.enum(PERMISSION_ACTIONS),
  description: z.string().nullable(),


  sort_order: z.number().int(),
  is_disabled: z.boolean(),
})

export const permissionSchema = permissionBaseSchema.safeExtend(
  auditSchema.shape
)

export const createPermissionSchema = permissionSchema
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

export const updatePermissionSchema = createPermissionSchema.partial()

export type PermissionBase = z.infer<typeof permissionBaseSchema>
export type Permission = z.infer<typeof permissionSchema>
export type CreatePermissionInput = z.input<typeof createPermissionSchema>
export type UpdatePermissionInput = z.input<typeof updatePermissionSchema>

export const permissionQuerySchema = paginationQuerySchema.extend({
  keyword: z.string().trim().optional(),

  is_disabled: z.boolean().optional(),
})

export type PermissionQuery = z.output<typeof permissionQuerySchema>

export const permissionListSchema = z.array(permissionSchema)
export type PermissionList = z.output<typeof permissionListSchema>
