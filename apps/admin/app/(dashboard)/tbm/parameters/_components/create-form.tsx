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

import { createParameterSchema } from "@workspace/tbm/parameter"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

import { TITLE } from "../constants"

import { createParameter } from "@/lib/tbm/parameter/action"

interface CreateFormProps {
  subsystemOptions: CodeNameOption[]
  onSuccess?: () => void
  onCancel?: () => void
}

export default function CreateForm({
  subsystemOptions,
  onSuccess,
  onCancel,
}: CreateFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof createParameterSchema>>({
    resolver: zodResolver(createParameterSchema),
    defaultValues: {
      subsystem_code: "s01",
      code: "",
      name: "",
      data_type: "",
      description: "",
      digits: 2,
      unit: "",
    },
  })

  async function onSubmit(data: z.infer<typeof createParameterSchema>) {
    console.log("Create parameter data:", data)
    try {
      const result = await createParameter(data)

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
      id="form-parameter"
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log("表单验证失败:", errors)
        console.log("当前表单数据:", form.getValues())
      })}
    >
      <FieldGroup>
        <Controller
          name="subsystem_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="form-parameter-subsystem-code">
                  所属子系统
                </FieldLabel>
                <FieldDescription>当前参数所属子系统</FieldDescription>
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
                  id="form-parameter-subsystem-code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择子系统" />
                </SelectTrigger>
                <SelectContent align="start">
                  {subsystemOptions.map((option) => (
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
              <FieldLabel htmlFor="form-parameter-code">参数编码</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="form-parameter-code"
                aria-invalid={fieldState.invalid}
                placeholder="输入参数编码"
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
              <FieldLabel htmlFor="form-parameter-name">参数名称</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="form-parameter-name"
                aria-invalid={fieldState.invalid}
                placeholder="输入参数名称"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="data_type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-parameter-data-type">
                数据类型
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id="form-parameter-data-type"
                className="min-h-24 resize-none"
                placeholder="输入数据类型（选填）"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="digits"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tunnel-digits">小数位数</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="form-tunnel-digits"
                type="number"
                min={0}
                aria-invalid={fieldState.invalid}
                placeholder="输入小数位数"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="unit"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-parameter-unit">单位</FieldLabel>

              <Input
                {...field}
                id="form-parameter-unit"
                name={field.name}
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
                placeholder="输入单位"
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
              <FieldLabel htmlFor="form-parameter-description">描述</FieldLabel>

              <Input
                {...field}
                id="form-parameter-description"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={field.value ?? ""}
                onChange={field.onChange}
                aria-invalid={fieldState.invalid}
                placeholder="输入描述"
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
          form="form-parameter"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${TITLE}`}
        </Button>
      </div>
    </form>
  )
}
