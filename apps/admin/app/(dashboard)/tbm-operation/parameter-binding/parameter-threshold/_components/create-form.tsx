"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"

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

import {
  createTbmParameterThresholdSchema,
  type CreateTbmParameterThresholdInput,
  type TbmParameterWithBase,
} from "@workspace/tbm/parameter"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { toNumberOrUndefined } from "@/components/utils"
import { ENTITY } from "@/lib/tbm/parameter-threshold"

import { create } from "@/lib/tbm/parameter-threshold/action"

import { CodeNameOption, thresholdTypeOptions } from "@workspace/shared"

interface CreateFormProps {
  row: TbmParameterWithBase
  options: CodeNameOption[]
  onSuccess?: () => void
  onCancel?: () => void
}

export default function CreateForm({
  row,
  options,
  onSuccess,
  onCancel,
}: CreateFormProps) {
  const router = useRouter()
  const form = useForm<CreateTbmParameterThresholdInput>({
    resolver: zodResolver(createTbmParameterThresholdSchema),
    defaultValues: {
      tbm_parameter_id: row.id,
      tunnel_id: null,
      start_ring: 1,
      end_ring: 100,
      threshold_type: "upper",
      severity_code: "52010001",
      threshold_value: 0,
      reference_value: null,
      min_record_delta: 0,
      min_record_interval_seconds: 600,
      remark: "",
    },
  })

  async function onSubmit(data: CreateTbmParameterThresholdInput) {
    console.log("Create parameter threshold data:", data)
    try {
      const result = await create(data)

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
      id="create-tbm-parameter-threshold"
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log("表单验证失败:", errors)
        console.log("当前表单数据:", form.getValues())
      })}
    >
      <FieldGroup>
        <Controller
          name="tbm_parameter_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="create-tbm-parameter-threshold-tbm_parameter_id">
                  TBM参数
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>

              <Input
                id="create-tbm-parameter-threshold-tbm_parameter_id"
                value={field.value}
                readOnly
                aria-invalid={fieldState.invalid}
                className="min-w-[120px]"
              />
            </Field>
          )}
        />
        <Controller
          name="start_ring"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-tbm-parameter-threshold-start_ring">
                起始环号
              </FieldLabel>

              <Input
                {...field}
                id="create-tbm-parameter-threshold-start_ring"
                type="number"
                min={1}
                step={1}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(toNumberOrUndefined(e.currentTarget))
                }
                aria-invalid={fieldState.invalid}
                placeholder="输入开始环号"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="end_ring"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-tbm-parameter-threshold-end_ring">
                终止环号
              </FieldLabel>

              <Input
                {...field}
                id="create-tbm-parameter-threshold-end_ring"
                type="number"
                min={1}
                step={1}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(toNumberOrUndefined(e.currentTarget))
                }
                aria-invalid={fieldState.invalid}
                placeholder="输入结束环号"
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
              <FieldLabel htmlFor="create-tbm-parameter-threshold-severity_code">
                告警等级
              </FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="create-tbm-parameter-threshold-severity_code"
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
              <FieldLabel htmlFor="create-tbm-parameter-threshold-threshold_type">
                阈值类型
              </FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="create-tbm-parameter-threshold-threshold_type"
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
              <FieldLabel htmlFor="create-tbm-parameter-threshold-reference_value">
                参考值
              </FieldLabel>

              <Input
                {...field}
                id="create-tbm-parameter-threshold-reference_value"
                type="number"
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(toNumberOrUndefined(e.currentTarget))
                }
                aria-invalid={fieldState.invalid}
                placeholder="请输入参考值"
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
              <FieldLabel htmlFor="create-tbm-parameter-threshold-threshold_value">
                阀值
              </FieldLabel>

              <Input
                {...field}
                id="create-tbm-parameter-threshold-threshold_value"
                type="number"
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
              <FieldLabel htmlFor="create-tbm-parameter-threshold-remark">
                备注
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id="create-tbm-parameter-threshold-remark"
                  rows={4}
                  maxLength={500}
                  className="min-h-24 resize-none"
                  placeholder="输入备注（选填）"
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
          form="create-tbm-parameter-threshold"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${ENTITY.label}`}
        </Button>
      </div>
    </form>
  )
}
