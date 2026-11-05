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

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

import { createEngineeringUnitSchema } from "@workspace/proj/unit"
import type { CreateEngineeringUnitInput } from "@workspace/proj/unit"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

import { createEngineeringUnit } from "@/lib/proj/unit/action"
import { TITLE } from "../constants"
import { Project } from "@workspace/proj/project"
import type { EngineeringUnitOptions } from "./types"

interface CreateFormProps {
  project: Project
  options: EngineeringUnitOptions
  onSuccess?: () => void
  onCancel?: () => void
}

export default function CreateForm({
  project,
  options,
  onSuccess,
  onCancel,
}: CreateFormProps) {
  const router = useRouter()
  const form = useForm<CreateEngineeringUnitInput>({
    resolver: zodResolver(createEngineeringUnitSchema),
    defaultValues: {
      project_id: project.id,
      name: "",
      full_name: "",
      engineering_unit_type_code: "20720001",
      sort_order: 0,
    },
  })

  async function onSubmit(data: CreateEngineeringUnitInput) {
    console.log("Create section data:", data)
    try {
      const result = await createEngineeringUnit(data)

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
        description: `${TITLE}创建成功`,
      })

      form.reset()
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error(`创建${TITLE}请求异常:`, error)
      toast.add({
        type: "error",
        description: `创建${TITLE}失败`,
        priority: "high",
      })
    }
  }
  function handleCancel() {
    onCancel?.()
  }

  return (
    <form
      id="create-engineering-unit"
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log("表单验证失败:", errors)
        console.log("当前表单数据:", form.getValues())
      })}
    >
      <FieldGroup>
        <Controller
          name="project_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="create-engineering-unit-project_id">
                  所属项目
                </FieldLabel>
                <FieldDescription>当前标段所属项目</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>

              <Input
                id="create-engineering-unit-project_id"
                value={project.name}
                readOnly
                aria-invalid={fieldState.invalid}
                className="min-w-[120px]"
              />
            </Field>
          )}
        />
        <Controller
          name="engineering_unit_type_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="create-engineering-unit-engineering_unit_type_code">
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
              >
                <SelectTrigger
                  id="create-engineering-unit-engineering_unit_type_code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择工程单元类型" />
                </SelectTrigger>
                <SelectContent align="start">
                  {options.unitTypeOptions.map((option) => (
                    <SelectItem key={option.code} value={option.code}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-engineering-unit-name">
                工程单元名称
              </FieldLabel>
              <Input
                {...field}
                id="create-engineering-unit-name"
                aria-invalid={fieldState.invalid}
                placeholder="输入工程单元名称"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="full_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-engineering-unit-full_name">
                工程单元全称
              </FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="create-engineering-unit-full_name"
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
              <FieldLabel htmlFor={`create-engineering-unit-overview-${project.code}`}>
                工程单元概述
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id={`create-engineering-unit-overview-${project.code}`}
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

        <Controller
          name="sort_order"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-engineering-unit-sort_order">
                排序
              </FieldLabel>

              <Input
                {...field}
                id="create-engineering-unit-sort_order"
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
        <Button type="button" onClick={handleCancel}>
          取消
        </Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          重置
        </Button>

        <Button
          type="submit"
          form="create-engineering-unit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${TITLE}`}
        </Button>
      </div>
    </form>
  )
}
