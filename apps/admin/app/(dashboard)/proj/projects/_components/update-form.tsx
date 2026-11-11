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
  updateProjectSchema,
  type Project,
  UpdateProjectInput,
  UpdateProjectOutput,
} from "@workspace/proj/project"

import { update } from "@/lib/proj/project/action"
import { ENTITY, type ProjectOptions } from "@/lib/proj/project"
interface UpdateFormProps {
  row: Project
  options: ProjectOptions
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(row: Project): UpdateProjectInput {
  return updateProjectSchema.parse(row)
}

export default function UpdateForm({
  row,
  options,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<UpdateProjectInput, unknown, UpdateProjectOutput>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: getDefaultValues(row),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(row))
  }, [row, form.reset])

  async function onSubmit(data: UpdateProjectInput) {
    // console.log("提交的数据:", data)
    try {
      const result = await update(row.id, data)

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

  const projectTypeLabelOptions = options.projectTypeOptions.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

  const projectSubTypeLabelOptions = options.projectSubTypeOptions.map(
    (option) => ({
      value: option.code,
      label: `${option.code} ${option.name}`,
    })
  )

  const managementModeLabelOptions = options.managementModeOptions.map(
    (option) => ({
      value: option.code,
      label: `${option.code} ${option.name}`,
    })
  )

  return (
    <form
      id={`update-project-${row.id}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        {/* 项目名称 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-project-${row.id}-name`}>
                项目名称
              </FieldLabel>

              <Input
                {...field}
                id={`update-project-${row.id}-name`}
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
                <FieldLabel
                  htmlFor={`update-project-${row.id}-project_type_code`}
                >
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
                  id={`update-project-${row.id}-project_type_code`}
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
          name="project_sub_type_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel
                  htmlFor={`update-project-${row.id}-project_sub_type_code`}
                >
                  项目子类型
                </FieldLabel>
                <FieldDescription>请选择项目子类型。</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                items={projectSubTypeLabelOptions}
              >
                <SelectTrigger
                  id={`update-project-${row.id}-project_sub_type_code`}
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择项目子类型" />
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
                <FieldLabel
                  htmlFor={`update-project-${row.id}-management_mode_code`}
                >
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
                  id={`update-project-${row.id}-management_mode_code`}
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
              <FieldLabel htmlFor={`update-project-${row.id}-overview`}>
                项目概述
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id={`update-project-${row.id}-overview`}
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
              <FieldLabel htmlFor={`update-project-${row.id}-key_points`}>
                项目要点
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id={`update-project-${row.id}-key_points`}
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

        <Controller
          name="country_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-project-${row.id}-country_code`}>
                国家
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-project-${row.id}-country_code`}
                className="min-h-24 resize-none"
                placeholder="输入国家（选填）"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="province_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-project-${row.id}-province_code`}>
                省份
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-project-${row.id}-province_code`}
                className="min-h-24 resize-none"
                placeholder="输入省份（选填）"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="city_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-project-${row.id}-city_code`}>
                城市
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-project-${row.id}-city_code`}
                className="min-h-24 resize-none"
                placeholder="输入城市（选填）"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="district_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-project-${row.id}-district_code`}>
                区县
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-project-${row.id}-district_code`}
                className="min-h-24 resize-none"
                placeholder="输入区县（选填）"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-project-${row.id}-address`}>
                详细地址
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-project-${row.id}-address`}
                className="min-h-24 resize-none"
                placeholder="输入详细地址（选填）"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="longitude"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-project-${row.id}-longitude`}>
                经度
              </FieldLabel>

              <Input
                {...field}
                id={`update-project-${row.id}-longitude`}
                type="number"
                step="any"
                min={-180}
                max={180}
                value={field.value ?? ""}
                onChange={(e) => {
                  const value = e.target.value
                  field.onChange(value === "" ? null : Number(value))
                }}
                aria-invalid={fieldState.invalid}
                placeholder="请输入经度，如 117.12345678"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="latitude"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-project-${row.id}-latitude`}>
                纬度
              </FieldLabel>

              <Input
                {...field}
                id={`update-project-${row.id}-latitude`}
                type="number"
                step="any"
                min={-90}
                max={90}
                value={field.value ?? ""}
                onChange={(e) => {
                  const value = e.target.value
                  field.onChange(value === "" ? null : Number(value))
                }}
                aria-invalid={fieldState.invalid}
                placeholder="请输入纬度，如 36.24552139"
              />

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
              <FieldLabel htmlFor={`update-project-${row.id}-is_disabled`}>
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-project-${row.id}-is_disabled`}
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
          form={`update-project-${row.id}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
