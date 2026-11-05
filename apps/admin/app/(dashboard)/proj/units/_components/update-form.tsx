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
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@workspace/ui/components/field"

import { Input } from "@workspace/ui/components/input"

import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"
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
  updateEngineeringUnitSchema,
  type EngineeringUnit,
  UpdateEngineeringUnitInput,
  UpdateEngineeringUnitOutput,
} from "@workspace/proj/unit"

import { updateEngineeringUnit } from "@/lib/proj/unit/action"
import { TITLE } from "../constants"
import { EngineeringUnitOptions } from "./types"

interface UpdateFormProps {
  unit: EngineeringUnit
  options: EngineeringUnitOptions
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(unit: EngineeringUnit): UpdateEngineeringUnitInput {
  return {
    engineering_unit_type_code: unit.engineering_unit_type_code,
    name: unit.name,
    full_name: unit.full_name,
    overview: unit.overview,
    is_disabled: unit.is_disabled,
    sort_order: unit.sort_order,
  }
}

export default function UpdateForm({
  unit,
  options,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<
    UpdateEngineeringUnitInput,
    unknown,
    UpdateEngineeringUnitOutput
  >({
    resolver: zodResolver(updateEngineeringUnitSchema),
    defaultValues: getDefaultValues(unit),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(unit))
  }, [unit, form.reset])

  async function onSubmit(data: UpdateEngineeringUnitInput) {
    // console.log("提交的数据:", data)
    try {
      const result = await updateEngineeringUnit(unit.id, data)

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
    form.reset(getDefaultValues(unit))
  }

  const unitTypeOptions = options.unitTypeOptions.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

  return (
    <form
      id={`update-engineering-unit-${unit.id}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="engineering_unit_type_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel
                  htmlFor={`update-engineering-unit-type-code-${unit.id}`}
                >
                  工程单元类型
                </FieldLabel>
                <FieldDescription>请选择工程单元类型。</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                items={unitTypeOptions}
              >
                <SelectTrigger
                  id={`update-engineering-unit-type-code-${unit.id}`}
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择工程单元类型" />
                </SelectTrigger>
                <SelectContent align="start">
                  {unitTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        {/* 工程单元名称 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-engineering-unit-name-${unit.id}`}>
                工程单元名称
              </FieldLabel>

              <Input
                {...field}
                id={`update-engineering-unit-name-${unit.id}`}
                aria-invalid={fieldState.invalid}
                placeholder="输入工程单元名称"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* 工程单元全称 */}
        <Controller
          name="full_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`update-engineering-unit-full_name-${unit.id}`}
              >
                工程单元全称
              </FieldLabel>

              <Input
                {...field}
                id={`update-engineering-unit-full_name-${unit.id}`}
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
                placeholder="输入工程单元全称"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="overview"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`update-engineering-unit-overview-${unit.id}`}
              >
                描述
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id={`update-engineering-unit-overview-${unit.id}`}
                  rows={4}
                  maxLength={100}
                  className="min-h-24 resize-none"
                  placeholder="输入描述（选填）"
                  aria-invalid={fieldState.invalid}
                />

                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {(field.value ?? "").length}/100
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
                htmlFor={`update-engineering-unit-is-disabled-${unit.id}`}
              >
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-engineering-unit-is-disabled-${unit.id}`}
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
              <FieldLabel htmlFor={`update-engineering-unit-sort_order-${unit.id}`}>
                排序
              </FieldLabel>

              <Input
                id={`update-engineering-unit-sort_order-${unit.id}`}
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
          form={`update-engineering-unit-${unit.id}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
