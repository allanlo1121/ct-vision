"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import type { z } from "zod"
import {
  type CodeNameOption,
  parameterDataTypeOptions,
} from "@workspace/shared"

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import { updateParameterSchema, type Parameter } from "@workspace/tbm/parameter"
import { toNumberOrUndefined } from "@/components/utils"

import { update } from "@/lib/tbm/parameter/action"
import { ENTITY } from "@/lib/tbm/parameter"

type UpdateParameterInput = z.input<typeof updateParameterSchema>
type UpdateParameterOutput = z.output<typeof updateParameterSchema>

interface UpdateFormProps {
  parameter: Parameter
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(parameter: Parameter): UpdateParameterInput {
  return {
    name: parameter.name,
    subsystem_code: parameter.subsystem_code,
    data_type: parameter.data_type,
    digits: parameter.digits,
    unit: parameter.unit,
    is_disabled: parameter.is_disabled,
    description: parameter.description,
    sort_order: parameter.sort_order,
  }
}

export default function UpdateForm({
  parameter,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<UpdateParameterInput, unknown, UpdateParameterOutput>({
    resolver: zodResolver(updateParameterSchema),
    defaultValues: getDefaultValues(parameter),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(parameter))
  }, [parameter, form.reset])

  async function onSubmit(data: UpdateParameterOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await update(parameter.code, data)

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
    form.reset(getDefaultValues(parameter))
  }

  return (
    <form
      id={`update-parameter-${parameter.code}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <input type="hidden" name="id" value={parameter.code} />
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
              <Input
                {...field}
                value={field.value ?? ""}
                id="form-parameter-subsystem_code"
                aria-invalid={fieldState.invalid}
                placeholder="输入子参数代码"
                autoComplete="off"
              />
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
                  <SelectValue placeholder="请选择数值类型" />
                </SelectTrigger>
                <SelectContent align="start">
                  {parameterDataTypeOptions.map((option) => (
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
        <Controller
          name="sort_order"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tunnel-sort_order">小数位数</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="form-tunnel-sort_order"
                type="number"
                min={0}
                step={1}
                onChange={(e) =>
                  field.onChange(toNumberOrUndefined(e.currentTarget))
                }
                aria-invalid={fieldState.invalid}
                placeholder="输入排序号"
                autoComplete="off"
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
          form={`update-parameter-${parameter.code}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
