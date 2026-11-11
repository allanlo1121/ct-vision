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
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

import { create } from "@/lib/hrm/employee/action"
import { ENTITY, type EmployeeOptions } from "@/lib/hrm/employee"
import {
  createEmployeeSchema,
  createEmployeeDefaults,
  type CreateEmployeeInput,
  type CreateEmployeeOutput,
} from "@workspace/hrm/employee"

interface CreateFormProps {
  options: EmployeeOptions
  onSuccess?: () => void
}

export default function CreateForm({ options, onSuccess }: CreateFormProps) {
  const router = useRouter()
  const form = useForm<CreateEmployeeInput, unknown, CreateEmployeeOutput>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: createEmployeeDefaults,
  })

  async function onSubmit(data: CreateEmployeeOutput) {
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

  const typeOptions = options.employmentTypeOptions?.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

  const genderOptions = options.genderOptions?.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

  const statusOptions = options.statusOptions?.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

  return (
    <form id="create-employee-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* 员工姓名 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`create-employee-name`}>员工姓名</FieldLabel>

              <Input
                {...field}
                id={`create-employee-name`}
                aria-invalid={fieldState.invalid}
                placeholder="输入员工姓名"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* 员工编码 */}
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`create-employee-code`}>员工编码</FieldLabel>

              <Input
                {...field}
                id={`create-employee-code`}
                aria-invalid={fieldState.invalid}
                placeholder="输入员工编码"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* 上级组织机构 */}
        <Controller
          name="organization_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`create-employee-organization_id`}>
                上级组织机构
              </FieldLabel>

              <Input
                {...field}
                id={`create-employee-organization_id`}
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
                placeholder="输入上级组织机构"
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
                <FieldLabel htmlFor="create-employee-employment_type_code">
                  用工类型
                </FieldLabel>
                <FieldDescription>请选择用工类型。</FieldDescription>
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
                  id="create-employee-employment_type_code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择用工类型" />
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
                <FieldLabel htmlFor="create-employee-status_code">
                  状态
                </FieldLabel>
                <FieldDescription>请选择状态。</FieldDescription>
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
                  id="create-employee-status_code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择状态" />
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
                <FieldLabel htmlFor="create-employee-gender_code">
                  性别
                </FieldLabel>
                <FieldDescription>请选择性别。</FieldDescription>
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
                  id="create-employee-gender_code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择性别" />
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
      </FieldGroup>

      <div className="mt-6 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          重置
        </Button>

        <Button
          type="submit"
          form="create-Employee-form"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${ENTITY.label}`}
        </Button>
      </div>
    </form>
  )
}
