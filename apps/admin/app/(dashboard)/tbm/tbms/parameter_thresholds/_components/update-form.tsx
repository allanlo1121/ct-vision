"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import type { z } from "zod"
import { updateParameterThresholdSchema } from "@workspace/tbm/parameter"

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

import { updateParameterThreshold } from "@/lib/tbm/parameter-threshold/action"
import { TITLE } from "../constants"
import { ParameterThresholdListRow } from "@workspace/tbm/parameter"
import type { ParameterThresholdOptions } from "@/lib/tbm/parameter-threshold/types"
import { thresholdTypeOptions, type ThresholdType } from "@workspace/shared"

type UpdateParameterThresholdInput = z.input<
  typeof updateParameterThresholdSchema
>
type UpdateParameterThresholdOutput = z.output<
  typeof updateParameterThresholdSchema
>

interface UpdateFormProps {
  threshold: ParameterThresholdListRow
  options: ParameterThresholdOptions
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(
  threshold: ParameterThresholdListRow
): UpdateParameterThresholdInput {
  return {
    severity_code: threshold.severity_code!,
    threshold_type: threshold.threshold_type as ThresholdType,
    threshold_value: threshold.threshold_value ?? 0,
    reference_value: threshold.reference_value,
    min_record_delta: threshold.min_record_delta ?? 0,
    min_record_interval_ms: threshold.min_record_interval_ms ?? 0,
    remark: threshold.remark,
  }
}

export default function UpdateForm({
  threshold,
  options,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()
  const { severityOptions } = options

  const form = useForm<
    UpdateParameterThresholdInput,
    unknown,
    UpdateParameterThresholdOutput
  >({
    resolver: zodResolver(updateParameterThresholdSchema),
    defaultValues: getDefaultValues(threshold),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(threshold))
  }, [threshold, form.reset])

  async function onSubmit(data: UpdateParameterThresholdOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await updateParameterThreshold(threshold.id!, data)

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
    form.reset(getDefaultValues(threshold))
  }

  return (
    <form
      id={`update-tbm-parameter-threshold-${threshold.id}`}
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
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type="number"
                min={0}
                step={0.01}
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
          name="min_record_interval_ms"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-tbm-parameter-threshold-min_record_interval_ms">
                报警最少间隔时间(毫秒)
              </FieldLabel>

              <Input
                {...field}
                id="create-tbm-parameter-threshold-min_record_interval_ms"
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

        <Controller
          name="remark"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="update-tbm-parameter-threshold-remark">
                描述
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id="update-tbm-parameter-threshold-remark"
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
          form={`update-tbm-parameter-threshold-${threshold.id}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
