"use client"

import { useEffect } from "react"
import type { ProjectOptions } from "./types"
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
  updateProjectSchema,
  type Project,
  UpdateProjectInput,
  UpdateProjectOutput,
} from "@workspace/proj/project"

import { updateProject } from "@/lib/proj/project/action"
import { TITLE } from "../constants"

interface UpdateFormProps {
  project: Project
  options: ProjectOptions
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(project: Project): UpdateProjectInput {
  return {
    name: project.name,
    code: project.code,
    full_name: project.full_name,
    overview: project.overview,
    key_points: project.key_points,
    project_type_code: project.project_type_code,
    project_sub_type_code: project.project_sub_type_code,
    management_mode_code: project.management_mode_code,
    latitude: project.latitude,
    longitude: project.longitude,

    is_disabled: project.is_disabled,
  }
}

export default function UpdateForm({
  project,
  options,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<UpdateProjectInput, unknown, UpdateProjectOutput>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: getDefaultValues(project),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(project))
  }, [project, form.reset])

  async function onSubmit(data: UpdateProjectInput) {
    // console.log("提交的数据:", data)
    try {
      const result = await updateProject(project.id, data)

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
    form.reset(getDefaultValues(project))
  }

  const projectTypeLabelOptions = options.projectTypeOptions.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

  const managementModeLabelOptions = options.managementModeOptions.map(
    (option) => ({
      value: option.code,
      label: `${option.code} ${option.name}`,
    })
  )

  return (
    <form
      id={`update-project-${project.code}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        {/* 项目名称 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-project-name-${project.code}`}>
                项目名称
              </FieldLabel>

              <Input
                {...field}
                id={`update-project-name-${project.code}`}
                aria-invalid={fieldState.invalid}
                placeholder="输入项目名称"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="project_type_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="form-project-project-type-code">
                  项目类型
                </FieldLabel>
                <FieldDescription>请选择字典类型。</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                items={projectTypeLabelOptions}
              >
                <SelectTrigger
                  id="form-project-project-type-code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择项目类型" />
                </SelectTrigger>
                <SelectContent align="start">
                  {projectTypeLabelOptions.map((option) => (
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
          name="management_mode_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="form-project-management-mode-code">
                  管理模式
                </FieldLabel>
                <FieldDescription>请选择字典类型。</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                items={managementModeLabelOptions}
              >
                <SelectTrigger
                  id="form-project-management-mode-code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择管理模式" />
                </SelectTrigger>
                <SelectContent align="start">
                  {managementModeLabelOptions.map((option) => (
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
          name="overview"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-project-overview-${project.code}`}>
                项目概述
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id={`update-project-overview-${project.code}`}
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
          name="key_points"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-project-key-points-${project.code}`}>
                项目要点
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id={`update-project-key-points-${project.code}`}
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
                htmlFor={`update-project-is-disabled-${project.code}`}
              >
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-project-is-disabled-${project.code}`}
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
          form={`update-project-${project.code}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
