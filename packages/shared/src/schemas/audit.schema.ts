import { z } from "zod"

export const auditSchema = z.object({
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }).nullable(),

  created_by: z.uuid().nullable(),
  updated_by: z.uuid().nullable(),
})

export type Audit = z.infer<typeof auditSchema>

export const softDeleteSchema = z.object({
  deleted_at: z.iso.datetime({ offset: true }).nullable(),
  deleted_by: z.uuid().nullable(),
})

export const fullAuditSchema = auditSchema.extend(
  softDeleteSchema.shape
)

export type FullAudit = z.infer<typeof fullAuditSchema>