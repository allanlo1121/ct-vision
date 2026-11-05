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
  updateCountrySchema,
  type Country,
  type UpdateCountryInput,
  type UpdateCountryOutput,
} from "@workspace/master-data/country"

import { updateCountry } from "@/lib/master-data/country/action"
import { TITLE } from "../constants"

interface UpdateFormProps {
  data: Country
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(data: Country): UpdateCountryInput {
  return {
    name: data.name,
    full_name: data.full_name,
    sort_order: data.sort_order,
    is_disabled: data.is_disabled,
  }
}

export default function UpdateForm({
  data,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<UpdateCountryInput, unknown, UpdateCountryOutput>({
    resolver: zodResolver(updateCountrySchema),
    defaultValues: getDefaultValues(data),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(data))
  }, [data, form.reset])

  async function onSubmit(input: UpdateCountryOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await updateCountry(data.code, input)

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
        {/* 字典类型名称 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-country-name-${data.code}`}>
                字典类型名称
              </FieldLabel>

              <Input
                {...field}
                id={`update-country-name-${data.code}`}
                aria-invalid={fieldState.invalid}
                placeholder="输入字典类型名称"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="full_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-country-full-name-${data.code}`}>
                全称
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-country-full-name-${data.code}`}
                placeholder="输入全称"
                aria-invalid={fieldState.invalid}
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
        {/* 排序 */}
        <Controller
          name="sort_order"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-country-sort-order-${data.code}`}>
                排序
              </FieldLabel>

              <Input
                id={`update-country-sort-order-${data.code}`}
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type="number"
                min={0}
                step={1}
                value={field.value ?? ""}
                onChange={(e) => {
                  const value = e.target.value

                  field.onChange(value === "" ? undefined : Number(value))
                }}
                aria-invalid={fieldState.invalid}
                placeholder="0"
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
