import { z } from "zod"

export const uuidSchema = z.uuid()

export const codeSchema = z.string().trim().min(1).max(100)

export const masterDataCodeSchema = z
  .string()
  .regex(/^\d{8}$/, "主数据编码必须为8位数字")

export type MasterDataCode = z.infer<typeof masterDataCodeSchema>

// 中国大陆居民身份证（基础格式）
export const idCardSchema = z
  .string()
  .regex(
    /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/,
    { message: "请输入有效的18位居民身份证号码" }
  )
  .transform((value) => value.toUpperCase())
  .nullable()
  .meta({
    title: "身份证号码",
  })

// 中国大陆手机号码
export const phoneSchema = z
  .string()
  .regex(/^1[3-9]\d{9}$/, {
    message: "请输入有效的11位手机号码",
  })
  .nullable()
  .meta({
    title: "手机号码",
  })

// 邮箱
export const emailSchema = z
  .email({ error: "请输入有效的邮箱地址" })
  .max(254)
  .nullable()
  .meta({
    title: "邮箱",
  })



export const serialIdSchema = z.int32().positive()
