import { z } from "zod"
import {
  uuidSchema,
  nameSchema,
  codeSchema,
  masterDataCodeSchema,
  sortOrderSchema,
  isDisabledSchema,
  auditSchema,
  birthDateSchema,
  idCardSchema,
  phoneSchema,
  emailSchema,
  dateSchema,
} from "@workspace/shared/schemas"

/**
 * 基础字段规则
 */
export const employeeBaseSchema = z.object({
  id: uuidSchema,

  auth_id: uuidSchema.nullable().meta({
    title: "关联账号",
  }),

  name: nameSchema.meta({
    title: "员工姓名",
    description: "员工的姓名",
  }),

  code: codeSchema
    .meta({
      title: "编码",
      description: "唯一标识，建议使用字母、数字和下划线",
    }),

  organization_id: uuidSchema.meta({
    title: "所属组织",
  }),

  gender_code: masterDataCodeSchema.nullable().meta({
    title: "性别",
    description: "主数据-性别-GENDER-1016",
  }),
  birth_date: birthDateSchema,
  id_card: idCardSchema,
  phone: phoneSchema,
  email: emailSchema,

  status_code: masterDataCodeSchema.nullable().meta({
    title: "员工状态",
    description: "主数据-员工类别-EMP_STATUS-1031",
  }),

  employment_type_code: codeSchema.nullable().meta({
    title: "员工类型",
    description: "主数据-员工类型-EMP_TYPE-1017",
  }),

  hire_date: dateSchema.nullable().meta({
    title: "入职日期",
    description: "入职日期",
  }),

  leave_date: dateSchema.nullable().meta({
    title: "离职日期",
    description: "离职日期",
  }),

  sort_order: sortOrderSchema,

  is_disabled: isDisabledSchema,
  external_id: z.string().nullable().meta({
    title: "外部ID",
  }),

  external_version: z.number().nullable().meta({
    title: "外部版本",
  }),
})

export const employeeSchema = employeeBaseSchema.safeExtend(auditSchema.shape)

export const createEmployeeSchema = employeeBaseSchema
  .omit({
    id: true,
    external_id: true,
    external_version: true,
    is_disabled: true,
  })
  .extend({
    sort_order: sortOrderSchema.default(0),
  })

export const updateEmployeeSchema = employeeSchema
  .omit({
    id: true,
    auth_id: true,
  })
  .partial()

export const importEmployeeSchema = employeeSchema
  .omit({
    id: true,
    auth_id: true,
    leave_date: true,
    updated_at: true,
    created_by: true,
    updated_by: true,
  })
  .extend({
    status_code: masterDataCodeSchema.default("10310001").meta({
      title: "员工状态",
      description: "主数据-员工状态-EMP_STATUS-1031",
    }),
    sort_order: sortOrderSchema.default(0),
  })

export type Employee = z.infer<typeof employeeSchema>

export type EmployeeBase = z.infer<typeof employeeBaseSchema>

export type CreateEmployeeInput = z.input<typeof createEmployeeSchema>

export type CreateEmployeeOutput = z.output<typeof createEmployeeSchema>

export type ImportEmployeeInput = z.input<typeof importEmployeeSchema>
export type ImportEmployeeOutput = z.output<typeof importEmployeeSchema>

export type UpdateEmployeeInput = z.input<typeof updateEmployeeSchema>
export type UpdateEmployeeOutput = z.output<typeof updateEmployeeSchema>

export type EmployeeFields = keyof z.infer<typeof employeeSchema>

export const BindEmployeeAuthSchema = z.object({
  employeeId: uuidSchema,
  authId: uuidSchema,
})

export const UnbindEmployeeAuthSchema = z.object({
  employeeId: uuidSchema,
})
