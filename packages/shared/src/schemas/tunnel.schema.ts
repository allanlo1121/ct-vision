import { z } from "zod"

export const chainageSchema = z.number().meta({
  title: "里程",
  description: "里程值，单位米，最多保留3位小数",
})

export type Chainage = z.infer<typeof chainageSchema>
