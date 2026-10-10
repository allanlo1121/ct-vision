import { z } from "zod";
import type { PaginationQuery } from "@workspace/shared/pagination";

/**
 * 国家字段定义
 */
export const CountryShape = {
  code: z
    .string()
    .regex(/^[A-Z]{2}$/, "国家编码必须为两个大写字母")
    .meta({
      title: "编码",
      description: "ISO 3166-1 alpha-2 国家编码，主键",
    }),

  name: z
    .string()
    .min(2, "国家名称至少2个字符")
    .max(50, "国家名称最多50个字符")
    .meta({
      title: "国家名称",
      description: "国家的常用名称",
    }),

  full_name: z
    .string()
    .max(100, "国家全称最多100个字符")
    .nullable()
    .meta({
      title: "国家全称",
      description: "国家的正式全称",
    }),

  sort_order: z
    .coerce.number()
    .int()
    .min(0)
    .default(0)
    .meta({
      title: "排序",
    }),

  is_disabled: z
    .boolean()
    .default(false)
    .meta({
      title: "是否禁用",
    }),
};

/**
 * 国家实体
 */
export const CountrySchema = z.object(CountryShape);

export const CreateCountrySchema = CountrySchema
  .omit({
    sort_order: true,
    is_disabled: true,
  })
  .extend({
    full_name: CountrySchema.shape.full_name.optional(),
  });

export const UpdateCountrySchema = CountrySchema
  .omit({ code: true })
  .partial();

export type Country = z.infer<typeof CountrySchema>;

export type CreateCountryInput =
  z.input<typeof CreateCountrySchema>;

export type UpdateCountryInput =
  z.input<typeof UpdateCountrySchema>;


import { PaginationQuerySchema } from "@workspace/shared";


export const CountryQuerySchema = PaginationQuerySchema.extend({
  keyword: z.string().trim().optional(),

  is_disabled: z.boolean().optional(),
});

export type CountryQuery =
  z.output<typeof CountryQuerySchema>;