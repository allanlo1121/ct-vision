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



import { createSubsystemSchema } from "@workspace/tbm/parameter"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

import { createSubsystem } from "@/lib/tbm/subsystem/action"
import { TITLE } from "../constants"
import { Project } from "@workspace/proj/project"

interface CreateFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function CreateForm({ onSuccess, onCancel }: CreateFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof createSubsystemSchema>>({
    resolver: zodResolver(createSubsystemSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
    },
  })

  async function onSubmit(data: z.infer<typeof createSubsystemSchema>) {
    console.log("Create subsystem data:", data)
    try {
      const result = await createSubsystem(data)

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
  function handleCancel() {
    onCancel?.()
  }

  return (
    <form
      id="form-subsystem"
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log("表单验证失败:", errors)
        console.log("当前表单数据:", form.getValues())
      })}
    >
      <FieldGroup>
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="form-subsystem-code">
                  子系统编码
                </FieldLabel>
                <FieldDescription>请输入子系统编码</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>

              <Input
                id="form-subsystem-code"
                value={field.value}
                readOnly
                aria-invalid={fieldState.invalid}
                className="min-w-[120px]"
              />
            </Field>
          )}
        />
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="form-subsystem-name">
                  子系统名称
                </FieldLabel>
                <FieldDescription>请输入子系统名称。</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Input
                {...field}
                id="form-subsystem-name"
                aria-invalid={fieldState.invalid}
                value={field.value ?? ""}
                placeholder="请输入子系统名称"
                autoComplete="off"
              />
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-subsystem-description">
                子系统描述
              </FieldLabel>
              <Input
                {...field}
                id="form-subsystem-description"
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
                placeholder="请输入子系统描述"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-6 flex justify-end gap-2">
        <Button type="button" onClick={handleCancel}>
          取消
        </Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          重置
        </Button>

        <Button
          type="submit"
          form="form-subsystem"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${TITLE}`}
        </Button>
      </div>
    </form>
  )
}
