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
  type Employee,
  UpdateEmployeeInput,
  UpdateEmployeeOutput,
  updateEmployeeSchema,
} from "@workspace/hrm/employee"

import { ENTITY, type EmployeeOptions } from "@/lib/hrm/employee"
import { update } from "@/lib/hrm/employee/action"

interface UpdateFormProps {
  row: Employee
  options: EmployeeOptions
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(row: Employee): UpdateEmployeeInput {
  return updateEmployeeSchema.parse(row)
}

export default function UpdateForm({
  row,
  options,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<UpdateEmployeeInput, unknown, UpdateEmployeeOutput>({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: getDefaultValues(row),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(row))
  }, [row, form.reset])

  async function onSubmit(data: UpdateEmployeeOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await update(row.code, data)

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

  const genderOptions = options.genderOptions.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))
  const typeOptions = options.employmentTypeOptions.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

  const statusOptions = options.statusOptions.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

  return (
    <form
      id={`update-employee-${row.id}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        {/* 员工姓名 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-employee-name-${row.id}`}>
                员工姓名
              </FieldLabel>

              <Input
                {...field}
                id={`update-employee-name-${row.id}`}
                aria-invalid={fieldState.invalid}
                placeholder="输入员工姓名"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* 员工编号 */}
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-employee-code-${row.id}`}>
                员工编号
              </FieldLabel>

              <Input
                {...field}
                id={`update-employee-code-${row.id}`}
                aria-invalid={fieldState.invalid}
                placeholder="输入员工编号"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="employment_type_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel
                  htmlFor={`update-employee-${row.id}-employment_type_code`}
                >
                  员工类型
                </FieldLabel>
                <FieldDescription>请选择员工类型。</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                items={typeOptions}
              >
                <SelectTrigger
                  id={`update-employee-${row.id}-employment_type_code`}
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择员工类型" />
                </SelectTrigger>
                <SelectContent align="start">
                  {typeOptions.map((option) => (
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
          name="status_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor={`update-employee-${row.id}-status_code`}>
                  员工状态
                </FieldLabel>
                <FieldDescription>请选择员工状态。</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                items={statusOptions}
              >
                <SelectTrigger
                  id={`update-employee-${row.id}-status_code`}
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择员工状态" />
                </SelectTrigger>
                <SelectContent align="start">
                  {statusOptions.map((option) => (
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
          name="gender_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor={`update-employee-${row.id}-gender_code`}>
                  员工性别
                </FieldLabel>
                <FieldDescription>请选择员工性别。</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                items={genderOptions}
              >
                <SelectTrigger
                  id={`update-employee-${row.id}-gender_code`}
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择员工性别" />
                </SelectTrigger>
                <SelectContent align="start">
                  {genderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        {/* 是否禁用 */}
        <Controller
          name="is_disabled"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-employee-is-disabled-${row.id}`}>
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-employee-is-disabled-${row.id}`}
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
          form={`update-employee-${row.id}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
