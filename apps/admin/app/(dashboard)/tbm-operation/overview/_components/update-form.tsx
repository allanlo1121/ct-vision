"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import type { z } from "zod"
import type { CodeNameOption } from "@workspace/shared"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@workspace/ui/components/field"

import { Input } from "@workspace/ui/components/input"

import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import { updateTbmSchema, type Tbm } from "@workspace/tbm/tbm"

import { updateTbm } from "@/lib/tbm/tbm/action"
import { TITLE } from "../constants"

type UpdateTbmInput = z.input<typeof updateTbmSchema>
type UpdateTbmOutput = z.output<typeof updateTbmSchema>

interface UpdateFormProps {
  tbm: Tbm
  tbmTypeOptions: CodeNameOption[]
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(tbm: Tbm): UpdateTbmInput {
  return {
    name: tbm.name,
    tbm_type_code: tbm.tbm_type_code,
    diameter: tbm.diameter,
    is_disabled: tbm.is_disabled,
  }
}

export default function UpdateForm({
  tbm,
  tbmTypeOptions,

  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<UpdateTbmInput, unknown, UpdateTbmOutput>({
    resolver: zodResolver(updateTbmSchema),
    defaultValues: getDefaultValues(tbm),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(tbm))
  }, [tbm, form.reset])

  async function onSubmit(data: UpdateTbmOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await updateTbm(tbm.code, data)

      // console.log("更新字典类型结果:", result)

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

      form.reset(data)

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
    form.reset(getDefaultValues(tbm))
  }

  const tbmTypeLabelOptions = tbmTypeOptions.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

  return (
    <form id={`update-tbm-${tbm.code}`} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* TBM名称 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-tbm-name-${tbm.code}`}>
                TBM名称
              </FieldLabel>

              <Input
                {...field}
                id={`update-tbm-name-${tbm.code}`}
                aria-invalid={fieldState.invalid}
                placeholder="输入TBM名称"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="tbm_type_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor={`update-tbm-tbm-type-code-${tbm.code}`}>
                  TBM类型
                </FieldLabel>
                <FieldDescription>请选择TBM类型。</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                items={tbmTypeLabelOptions}
              >
                <SelectTrigger
                  id={`update-tbm-tbm-type-code-${tbm.code}`}
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择TBM类型" />
                </SelectTrigger>
                <SelectContent align="start">
                  {tbmTypeLabelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="diameter"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-tbm-diameter-${tbm.code}`}>
                直径
              </FieldLabel>

              <Input
                {...field}
                id={`update-tbm-diameter-${tbm.code}`}
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
                placeholder="输入直径"
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
              <FieldLabel htmlFor={`update-tbm-is-disabled-${tbm.code}`}>
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-tbm-is-disabled-${tbm.code}`}
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
          form={`update-tbm-${tbm.code}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
