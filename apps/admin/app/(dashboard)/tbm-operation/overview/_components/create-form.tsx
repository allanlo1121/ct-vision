"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import * as z from "zod"
import type { CodeNameOption } from "@workspace/shared"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@workspace/ui/components/field"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import { createTbmSchema } from "@workspace/tbm/tbm"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

import { createTbm } from "@/lib/tbm/tbm/action"
import { TITLE } from "../constants"

interface CreateFormProps {
  tbmTypeOptions: CodeNameOption[]
  onSuccess?: () => void
}

export default function CreateForm({
  tbmTypeOptions,
  onSuccess,
}: CreateFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof createTbmSchema>>({
    resolver: zodResolver(createTbmSchema),
    defaultValues: {
      code: "",
      name: "",
      tbm_type_code: "",
      diameter: null,
    },
  })

  async function onSubmit(data: z.infer<typeof createTbmSchema>) {
    try {
      const result = await createTbm(data)

      // console.log("Create application result:", result)

      if (!result.success) {
        toast.add({
          type: "error",
          description: result.message,
          priority: "high",
        })
        return
      }

      toast.add({
        type: "success",
        description: `${TITLE}创建成功`,
      })

      form.reset()
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error(`创建${TITLE}请求异常:`, error)
      toast.add({
        type: "error",
        description: `创建${TITLE}失败`,
        priority: "high",
      })
    }
  }

  return (
    <form id="form-tbm" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="tbm_type_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="form-tbm-tbm-type-code">
                  TBM 类型
                </FieldLabel>
                <FieldDescription>请选择字典类型。</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="form-tbm-tbm-type-code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择字典类型" />
                </SelectTrigger>
                <SelectContent align="start">
                  {tbmTypeOptions.map((option) => (
                    <SelectItem key={option.code} value={option.code}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tbm-code">TBM 编码</FieldLabel>
              <Input
                {...field}
                id="form-tbm-code"
                aria-invalid={fieldState.invalid}
                placeholder="输入 TBM 编码"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tbm-name">TBM 名称</FieldLabel>
              <Input
                {...field}
                id="form-tbm-name"
                aria-invalid={fieldState.invalid}
                placeholder="输入 TBM 名称"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="diameter"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tbm-diameter">直径</FieldLabel>

              <Input
                {...field}
                id="form-tbm-diameter"
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
                placeholder="输入直径"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-6 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          重置
        </Button>

        <Button
          type="submit"
          form="form-dictionary-item"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${TITLE}`}
        </Button>
      </div>
    </form>
  )
}
