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
import { toNumberOrUndefined } from "@/components/utils"

import { create } from "@/lib/tbm/parameter-threshold-default/action"
import { ENTITY } from "@/lib/tbm/parameter-threshold-default"
import {
  type Parameter,
  type CreateParameterThresholdDefaultInput,
  createParameterThresholdDefaultSchema,
} from "@workspace/tbm/parameter"
import { CodeNameOption } from "@workspace/shared"
import { thresholdTypeOptions, type ThresholdType } from "@workspace/shared"

interface CreateFormProps {
  parameter: Parameter
  options: CodeNameOption[]
  onSuccess?: () => void
  onCancel?: () => void
}

export default function CreateForm({
  parameter,
  options,
  onSuccess,
  onCancel,
}: CreateFormProps) {
  const router = useRouter()

  const form = useForm<CreateParameterThresholdDefaultInput>({
    resolver: zodResolver(createParameterThresholdDefaultSchema),
    defaultValues: {
      parameter_code: parameter.code,
      severity_code: "52010001",
      threshold_type: "deviation",
      reference_value: null,
      threshold_value: 0,
      min_record_delta: 0,
      min_record_interval_seconds: 0,
      remark: null,
    },
  })

  async function onSubmit(data: CreateParameterThresholdDefaultInput) {
    try {
      const result = await create(data)

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
        description: `${ENTITY.label}创建成功`,
      })

      form.reset()
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error(`创建${ENTITY.label}请求异常:`, error)
      toast.add({
        type: "error",
        description: `创建${ENTITY.label}失败`,
        priority: "high",
      })
    }
  }
  function handleCancel() {
    onCancel?.()
  }

  return (
    <form
      id="form-parameter-threshold-default"
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log("表单验证失败:", errors)
        console.log("当前表单数据:", form.getValues())
      })}
    >
      <FieldGroup>
        {/* TBM参数编码 */}
        <Controller
          name="parameter_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`update-parameter-threshold-default-parameter_code`}
              >
                TBM参数编码
              </FieldLabel>

              <Input
                {...field}
                id={`update-parameter-threshold-default-parameter_code`}
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
                  {options.map((option) => (
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
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
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
                  rows={2}
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
        <Button type="button" onClick={handleCancel}>
          取消
        </Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          重置
        </Button>

        <Button
          type="submit"
          form="form-parameter-threshold-default"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${ENTITY.label}`}
        </Button>
      </div>
    </form>
  )
}
