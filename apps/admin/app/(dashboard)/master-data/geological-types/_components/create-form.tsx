"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import * as z from "zod"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@workspace/ui/components/field"



import { createGeologicalTypeSchema } from "@workspace/master-data/geological-type"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { createGeologicalType } from "@/lib/master-data/geological-type/action"
import { TITLE } from "../constants"

interface CreateFormProps {
  onSuccess?: () => void
}

export default function CreateForm({ onSuccess }: CreateFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof createGeologicalTypeSchema>>({
    resolver: zodResolver(createGeologicalTypeSchema),
    defaultValues: {
      code: "",
      name: "",
      parent_code: "",  
    },
  })

  async function onSubmit(data: z.infer<typeof createGeologicalTypeSchema>) {
    try {
      const result = await createGeologicalType(data)

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
    <form id="form-geological-type" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-geological-type-code">
                地质类型编码
              </FieldLabel>
              <Input
                {...field}
                id="form-geological-type-code"
                aria-invalid={fieldState.invalid}
                placeholder="输入地质类型编码"
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
              <FieldLabel htmlFor="form-geological-type-name">
                地质类型名称
              </FieldLabel>
              <Input
                {...field}
                id="form-geological-type-name"
                aria-invalid={fieldState.invalid}
                placeholder="输入地质类型名称"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="parent_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-geological-type-parent_code">
                上级地质类型
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id="form-geological-type-parent_code"
                aria-invalid={fieldState.invalid}
                placeholder="输入上级地质类型"
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
          form="form-geological-type"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${TITLE}`}
        </Button>
      </div>
    </form>
  )
}
