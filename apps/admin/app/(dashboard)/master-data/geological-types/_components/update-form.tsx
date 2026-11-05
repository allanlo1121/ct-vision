"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import type { z } from "zod"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"

import { Input } from "@workspace/ui/components/input"

import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"

import {
  type GeologicalType,
  type UpdateGeologicalTypeInput,
  type UpdateGeologicalTypeOutput,
  updateGeologicalTypeSchema,
} from "@workspace/master-data/geological-type"

import { updateGeologicalType } from "@/lib/master-data/geological-type/action"
import { TITLE } from "../constants"

interface UpdateFormProps {
  data: GeologicalType
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(data: GeologicalType): UpdateGeologicalTypeInput {
  return {
    name: data.name,
    parent_code: data.parent_code,
    is_disabled: data.is_disabled,
  }
}

export default function UpdateForm({
  data,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<
    UpdateGeologicalTypeInput,
    unknown,
    UpdateGeologicalTypeOutput
  >({
    resolver: zodResolver(updateGeologicalTypeSchema),
    defaultValues: getDefaultValues(data),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(data))
  }, [data, form.reset])

  async function onSubmit(input: UpdateGeologicalTypeInput) {
    // console.log("提交的数据:", data)
    try {
      const result = await updateGeologicalType(data.code, input)

      console.log("更新字典类型结果:", result)

      if (!result.success) {
        toast.add({
          type: "error",
          title: `更新${TITLE}失败`,
          description: result.message,
          priority: "high",
        })
        return
      }

      toast.add({
        type: "success",
        title: `更新${TITLE}成功`,
        description: `${TITLE}信息已更新`,
      })

      form.reset(getDefaultValues(data))

      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error(`更新${TITLE}请求异常:`, error)

      toast.add({
        type: "error",
        title: `更新${TITLE}失败`,
        description: `发生未知错误，请稍后重试`,
        priority: "high",
      })
    }
  }

  function handleReset() {
    form.reset(getDefaultValues(data))
  }

  return (
    <form
      id={`update-country-${data.code}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        {/* 地质类型名称 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-country-name-${data.code}`}>
                地质类型名称
              </FieldLabel>

              <Input
                {...field}
                id={`update-country-name-${data.code}`}
                aria-invalid={fieldState.invalid}
                placeholder="输入地质类型名称"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* 上级地质类型 */}
        <Controller
          name="parent_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-country-parent-code-${data.code}`}>
                上级地质类型
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-country-parent-code-${data.code}`}
                aria-invalid={fieldState.invalid}
                placeholder="输入上级地质类型"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* 是否禁用 */}
        <Controller
          name="is_disabled"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-country-is-disabled-${data.code}`}>
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-country-is-disabled-${data.code}`}
                name={field.name}
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-6 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          取消
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={!isDirty || isSubmitting}
          onClick={handleReset}
        >
          重置
        </Button>

        <Button
          type="submit"
          form={`update-country-${data.code}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
