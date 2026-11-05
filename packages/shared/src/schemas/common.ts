import { z } from "zod"

export const nameSchema = z.string().trim().min(1).max(100)

export const descriptionSchema = z.string().trim().max(500).nullable()

export const remarkSchema = z.string().trim().max(1000).nullable()

export const sortOrderSchema = z.int().min(0)

export const isDisabledSchema = z.boolean()

// 统一处理空值
export const emptyToNull = (value: unknown) => {
  if (typeof value !== "string") return value

  const trimmed = value.trim()
  return trimmed === "" ? null : trimmed
}

//正整数
export const positiveIntSchema = z
.number()
.int()
.positive()

export const nonNegativeIntSchema = z.int().nonnegative()

export const ringSchema = z.int32().nonnegative()


export const jsonObjectSchema = z.record(
  z.string(),
  z.json()
)