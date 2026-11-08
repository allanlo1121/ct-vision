"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import {} from "@workspace/tbm/parameter"
import {
  type TbmParameterThresholdWithBase,
  updateTbmParameterThresholdSchema,
} from "@workspace/tbm/parameter"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { toNumberOrUndefined } from "@/components/utils"

import { update } from "@/lib/tbm/parameter-threshold/action"
import { ENTITY } from "@/lib/tbm/parameter-threshold"
import {
  UpdateTbmParameterThresholdInput,
  UpdateTbmParameterThresholdOutput,
} from "@workspace/tbm/parameter"
import type { ParameterThresholdOptions } from "@/lib/tbm/parameter-threshold/types"
import { thresholdTypeOptions, type ThresholdType } from "@workspace/shared"
import type { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default"

interface UpdateFormProps {
  row: TbmParameterThresholdWithBase
  options: ParameterThresholdDefaultOptions
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(
  row: TbmParameterThresholdWithBase
): UpdateTbmParameterThresholdInput {
  return {
    severity_code: row.severity_code!,
    threshold_type: row.threshold_type as ThresholdType,
    threshold_value: row.threshold_value ?? 0,
    reference_value: row.reference_value,
    min_record_delta: row.min_record_delta ?? 0,
    min_record_interval_seconds: row.min_record_interval_seconds ?? 0,
    remark: row.remark,
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
    UpdateTbmParameterThresholdInput,
    unknown,
    UpdateTbmParameterThresholdOutput
  >({
    resolver: zodResolver(updateTbmParameterThresholdSchema),
    defaultValues: getDefaultValues(row),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(row))
  }, [row, form.reset])

  async function onSubmit(data: UpdateTbmParameterThresholdOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await update(row.id!, data)

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
      id={`update-tbm-parameter-threshold-${row.id}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="severity_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="update-tbm-parameter-threshold-severity_code">
                告警等级
              </FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="update-tbm-parameter-threshold-severity_code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择严重性" />
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
              <FieldLabel htmlFor="update-tbm-parameter-threshold-threshold-type">
                阈值类型
              </FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="update-tbm-parameter-threshold-threshold-type"
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
              <FieldLabel htmlFor="update-tbm-parameter-threshold-reference_value">
                参考值
              </FieldLabel>

              <Input
                {...field}
                id="update-tbm-parameter-threshold-reference_value"
                type="number"
                step={0.001}
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
          name="threshold_value"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="update-tbm-parameter-threshold-threshold_value">
                阀值
              </FieldLabel>

              <Input
                {...field}
                id="update-tbm-parameter-threshold-threshold_value"
                type="number"
                step={0.001}
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
          name="min_record_delta"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-tbm-parameter-threshold-min_record_delta">
                报警最小波动值
              </FieldLabel>

              <Input
                {...field}
                id="create-tbm-parameter-threshold-min_record_delta"
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
              <FieldLabel htmlFor="create-tbm-parameter-threshold-min_record_interval_seconds">
                报警最少间隔时间(秒)
              </FieldLabel>

              <Input
                {...field}
                id="create-tbm-parameter-threshold-min_record_interval_seconds"
                type="number"
                min={0}
                step={1}
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
          name="remark"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="update-tbm-parameter-threshold-remark">
                备注信息
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id="update-tbm-parameter-threshold-remark"
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
          form={`update-tbm-parameter-threshold-${row.id}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
