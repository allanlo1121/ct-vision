"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"


import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@workspace/ui/components/field"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

import { Input } from "@workspace/ui/components/input"

import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"
import { toNumberOrUndefined } from "@/components/utils"

import {
  updateParameterThresholdDefaultSchema,
  type ParameterThresholdDefault,
  type UpdateParameterThresholdDefaultInput,
  type UpdateParameterThresholdDefaultOutput,
} from "@workspace/tbm/parameter"
import type { ParameterThresholdDefaultWithBase } from "@workspace/tbm/parameter"
import type { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default/"
import { thresholdTypeOptions, type ThresholdType } from "@workspace/shared"

import { ENTITY } from "@/lib/tbm/parameter-threshold-default"

import { update } from "@/lib/tbm/parameter-threshold-default/action"

interface UpdateFormProps {
  row: ParameterThresholdDefaultWithBase
  options: ParameterThresholdDefaultOptions
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(
  row: ParameterThresholdDefault
): UpdateParameterThresholdDefaultInput {
  return {
    parameter_code: row.parameter_code,
    severity_code: row.severity_code,
    threshold_type: row.threshold_type,
    reference_value: row.reference_value,
    threshold_value: row.threshold_value,
    min_record_delta: row.min_record_delta,
    min_record_interval_seconds: row.min_record_interval_seconds,
    remark: row.remark,
    is_disabled: row.is_disabled,
  }
}

export default function UpdateForm({
  row,
  options,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()
  const { severityOptions } = options
  const form = useForm<
    UpdateParameterThresholdDefaultInput,
    unknown,
    UpdateParameterThresholdDefaultOutput
  >({
    resolver: zodResolver(updateParameterThresholdDefaultSchema),
    defaultValues: getDefaultValues(row),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(row))
  }, [row, form.reset])

  async function onSubmit(data: UpdateParameterThresholdDefaultOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await update(row.id, data)

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
      id={`update-parameter-threshold-default-${row.id}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <input type="hidden" name="code" value={row.id} />
      <FieldGroup>
        {/* TBM参数名称 */}
        <Controller
          name="parameter_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`update-parameter-threshold-default-${row.id}-name`}
              >
                TBM参数名称
              </FieldLabel>

              <Input
                {...field}
                id={`update-parameter-threshold-default-${row.id}-name`}
                aria-invalid={fieldState.invalid}
                readOnly
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="severity_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="update-parameter-threshold-default-severity_code">
                告警等级
              </FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="update-parameter-threshold-default-severity_code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择告警等级" />
                </SelectTrigger>
                <SelectContent align="start">
                  {severityOptions.map((option) => (
                    <SelectItem key={option.code} value={option.code}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="threshold_type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="update-parameter-threshold-default-threshold-type">
                阈值类型
              </FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="update-parameter-threshold-default-threshold-type"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择阈值类型" />
                </SelectTrigger>
                <SelectContent align="start">
                  {thresholdTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="reference_value"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="update-parameter-threshold-default-reference_value">
                参考值
              </FieldLabel>

              <Input
                {...field}
                id="update-parameter-threshold-default-reference_value"       
                type="number"
                step={0.001}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(toNumberOrUndefined(e.currentTarget))
                }
                aria-invalid={fieldState.invalid}
                placeholder="选择偏差类型时必须输入参考数值"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="threshold_value"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="update-parameter-threshold-default-threshold_value">
                阀值
              </FieldLabel>

              <Input
                {...field}
                id="update-parameter-threshold-default-threshold_value"
                type="number"
                step={0.001}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(toNumberOrUndefined(e.currentTarget))
                }
                aria-invalid={fieldState.invalid}
                placeholder="请输入阀值数值"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="min_record_delta"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-parameter-threshold-default-min_record_delta">
                报警最小波动值
              </FieldLabel>

              <Input
                {...field}
                id="create-parameter-threshold-default-min_record_delta"
                type="number"
                min={0}
                step={0.01}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(toNumberOrUndefined(e.currentTarget))
                }
                aria-invalid={fieldState.invalid}
                placeholder="0"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="min_record_interval_seconds"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-parameter-threshold-default-min_record_interval_seconds">
                报警最少间隔(秒)
              </FieldLabel>

              <Input
                {...field}
                id="create-parameter-threshold-default-min_record_interval_seconds"
                type="number"
                min={0}
                step={1}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(toNumberOrUndefined(e.currentTarget))
                }
                aria-invalid={fieldState.invalid}
                placeholder="输入报警间隔最短时间"
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
              <FieldLabel htmlFor="update-parameter-threshold-default-remark">
                备注信息
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id="update-parameter-threshold-default-remark"
                  rows={4}
                  maxLength={500}
                  className="min-h-24 resize-none"
                  placeholder="输入备注信息（选填）"
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
                htmlFor={`update-parameter-threshold-default-is-disabled-${row.id}`}
              >
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-parameter-threshold-default-is-disabled-${row.id}`}
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
          form={`update-parameter-threshold-default-${row.id}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
