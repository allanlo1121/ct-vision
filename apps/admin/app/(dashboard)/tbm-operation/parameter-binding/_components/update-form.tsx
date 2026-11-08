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
  FieldContent,
  FieldDescription,
} from "@workspace/ui/components/field"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

import { Input } from "@workspace/ui/components/input"

import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"

import { updateTbmParameterSchema } from "@workspace/tbm/parameter"

import { updateTbmParameter } from "@/lib/tbm/tbm-parameter/action"
import { ENTITY } from "@/lib/tbm/tbm-parameter"
import type { TbmParameterWithBase } from "@workspace/tbm/parameter"

type UpdateTbmParameterInput = z.input<typeof updateTbmParameterSchema>
type UpdateTbmParameterOutput = z.output<typeof updateTbmParameterSchema>

interface UpdateFormProps {
  row: TbmParameterWithBase
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(row: TbmParameterWithBase): UpdateTbmParameterInput {
  return {
    custom_name: row.custom_name,
    custom_unit: row.custom_unit,
    value_max: row.value_max,
    value_min: row.value_min,
    remark: row.remark,
  }
}

export default function UpdateForm({
  row,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<
    UpdateTbmParameterInput,
    unknown,
    UpdateTbmParameterOutput
  >({
    resolver: zodResolver(updateTbmParameterSchema),
    defaultValues: getDefaultValues(row),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(row))
  }, [row, form.reset])

  async function onSubmit(data: UpdateTbmParameterOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await updateTbmParameter(row.id, data)

      // console.log("更新字典类型结果:", result)

      if (!result.success) {
        toast.add({
          type: "error",
          title: `更新${ENTITY.label}失败`,
          description: result.message,
          priority: "high",
        })
        return
      }

      toast.add({
        type: "success",
        title: `更新${ENTITY.label}成功`,
        description: `${ENTITY.label}信息已更新`,
      })

      form.reset(data)

      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error(`更新${ENTITY.label}请求异常:`, error)

      toast.add({
        type: "error",
        title: `更新${ENTITY.label}失败`,
        description: `发生未知错误，请稍后重试`,
        priority: "high",
      })
    }
  }

  function handleReset() {
    form.reset(getDefaultValues(row))
  }

  return (
    <form
      id={`update-tbm-parameter-${row.id}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <input type="hidden" name="id" value={row.id} />
      <input type="hidden" name="tbm_code" value={row.tbm_code} />
      <input type="hidden" name="parameter_code" value={row.parameter_code} />
      <FieldGroup>
        <Controller
          name="custom_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`update-tbm-parameter-custom-name-${row.id}`}
              >
                自定义参数名称
              </FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-tbm-parameter-custom-name-${row.id}`}
                aria-invalid={fieldState.invalid}
                placeholder="输入自定义参数名称"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="custom_unit"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`update-tbm-parameter-custom-unit-${row.id}`}
              >
                自定义单位
              </FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-tbm-parameter-custom-unit-${row.id}`}
                aria-invalid={fieldState.invalid}
                placeholder="输入自定义单位"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="value_min"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-tbm-parameter-value-min-${row.id}`}>
                最小值
              </FieldLabel>

              <Input
                {...field}
                id={`update-tbm-parameter-value-min-${row.id}`}
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type="number"
                min={0}
                step={0.001}
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

        <Controller
          name="value_max"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-tbm-parameter-value-max-${row.id}`}>
                最大值
              </FieldLabel>

              <Input
                {...field}
                id={`update-tbm-parameter-value-max-${row.id}`}
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type="number"
                min={0}
                step={0.001}
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

        <Controller
          name="remark"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-tbm-parameter-remark-${row.id}`}>
                备注
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id={`update-tbm-parameter-remark-${row.id}`}
                  rows={4}
                  maxLength={500}
                  className="min-h-24 resize-none"
                  placeholder="输入描述（选填）"
                  aria-invalid={fieldState.invalid}
                />

                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {(field.value ?? "").length}/500
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>

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
              <FieldLabel
                htmlFor={`update-tbm-parameter-is-disabled-${row.id}`}
              >
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-tbm-parameter-is-disabled-${row.id}`}
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
          form={`update-tbm-parameter-${row.id}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
