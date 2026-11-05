import { z } from "zod"

export const timestampSchema = z.iso.datetime({
  offset: true,
})

export const dateSchema = z.iso.date()

// 出生日期
export const birthDateSchema = z.iso.date().nullable().meta({
  title: "出生日期",
})


