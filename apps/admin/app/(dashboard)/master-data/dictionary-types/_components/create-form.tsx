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

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

import { createDictionaryTypeSchema } from "@workspace/master-data/dictionary-type"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { createDictionaryType } from "@/lib/master-data/dictionary-type/action"
import { TITLE } from "../constants";

interface CreateFormProps {
  onSuccess?: () => void
}

export default function CreateForm({ onSuccess }: CreateFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof createDictionaryTypeSchema>>({
    resolver: zodResolver(createDictionaryTypeSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
    },
  })

  async function onSubmit(data: z.infer<typeof createDictionaryTypeSchema>) {
    try {
      const result = await createDictionaryType(data)

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
    <form id="form-dictionary-type" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-dictionary-type-code">
                字典类型编码
              </FieldLabel>
              <Input
                {...field}
                id="form-dictionary-type-code"
                aria-invalid={fieldState.invalid}
                placeholder="输入字典类型编码"
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
              <FieldLabel htmlFor="form-dictionary-type-name">
                字典类型名称
              </FieldLabel>
              <Input
                {...field}
                id="form-dictionary-type-name"
                aria-invalid={fieldState.invalid}
                placeholder="输入字典类型名称"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-dictionary-type-description">
                描述
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id="form-dictionary-type-description"
                  rows={4}
                  maxLength={100}
                  className="min-h-24 resize-none"
                  placeholder="输入描述（选填）"
                  aria-invalid={fieldState.invalid}
                />

                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {(field.value ?? "").length}/100
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          重置
        </Button>

        <Button
          type="submit"
          form="form-dictionary-type"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${TITLE}`}
        </Button>
      </div>
    </form>
  )
}
