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
import {
  type CreateProjectInput,
  type CreateProjectOutput,
  createProjectDefaults,
  createProjectSchema,
} from "@workspace/proj/project"
import { ENTITY, type ProjectOptions } from "@/lib/proj/project"
import { create } from "@/lib/proj/project/action"

interface CreateFormProps {
  options: ProjectOptions
  onSuccess?: () => void
}

export default function CreateForm({ options, onSuccess }: CreateFormProps) {
  const router = useRouter()
  const form = useForm<CreateProjectInput, unknown, CreateProjectOutput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: createProjectDefaults,
  })

  async function onSubmit(data: CreateProjectOutput) {
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
    <form id="create-project-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* 项目名称 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`create-project-name`}>项目名称</FieldLabel>

              <Input
                {...field}
                id={`create-project-name`}
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
                <FieldLabel htmlFor={`create-project-project_type_code`}>
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
                  id={`create-project-project_type_code`}
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
                <FieldLabel htmlFor={`create-project-project_sub_type_code`}>
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
                  id={`create-project-project_sub_type_code`}
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
                <FieldLabel htmlFor={`create-project-management_mode_code`}>
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
                  id={`create-project-management_mode_code`}
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
              <FieldLabel htmlFor={`create-project-overview`}>
                项目概述
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id={`create-project-overview`}
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
              <FieldLabel htmlFor={`create-project-key_points`}>
                项目要点
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id={`create-project-key_points`}
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
              <FieldLabel htmlFor={`create-project-country_code`}>
                国家
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`create-project-country_code`}
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
              <FieldLabel htmlFor={`create-project-province_code`}>
                省份
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`create-project-province_code`}
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
              <FieldLabel htmlFor={`create-project-city_code`}>城市</FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`create-project-city_code`}
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
              <FieldLabel htmlFor={`create-project-district_code`}>
                区县
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`create-project-district_code`}
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
              <FieldLabel htmlFor={`create-project-address`}>
                详细地址
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`create-project-address`}
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
              <FieldLabel htmlFor={`create-project-longitude`}>经度</FieldLabel>

              <Input
                {...field}
                id={`create-project-longitude`}
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
              <FieldLabel htmlFor={`create-project-latitude`}>纬度</FieldLabel>

              <Input
                {...field}
                id={`create-project-latitude`}
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
      </FieldGroup>

      <div className="mt-6 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          重置
        </Button>

        <Button
          type="submit"
          form="create-project-form"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${ENTITY.label}`}
        </Button>
      </div>
    </form>
  )
}
