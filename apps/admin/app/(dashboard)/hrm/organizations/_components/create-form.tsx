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

import { create } from "@/lib/hrm/organization/action"
import { ENTITY, type OrganizationOptions } from "@/lib/hrm/organization"
import {
  CreateOrganizationInput,
  createOrganizationSchema,
  CreateOrganizationOutput,
  createOrganizationDefaults,
} from "@workspace/hrm/organization"

interface CreateFormProps {
  options: OrganizationOptions
  onSuccess?: () => void
}

export default function CreateForm({ options, onSuccess }: CreateFormProps) {
  const router = useRouter()
  const form = useForm<
    CreateOrganizationInput,
    unknown,
    CreateOrganizationOutput
  >({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: createOrganizationDefaults,
  })

  async function onSubmit(data: CreateOrganizationOutput) {
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

  const typeOptions = options.orgTypeOptions?.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

  const categoryOptions = options.orgCategoryOptions?.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

  return (
    <form id="create-organization-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* 组织机构简称 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`create-organization-name`}>
                组织机构名称
              </FieldLabel>

              <Input
                {...field}
                id={`create-organization-name`}
                aria-invalid={fieldState.invalid}
                placeholder="输入组织机构名称"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* 组织机构编码 */}
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`create-organization-code`}>
                组织机构编码
              </FieldLabel>

              <Input
                {...field}
                id={`create-organization-code`}
                aria-invalid={fieldState.invalid}
                placeholder="输入组织机构编码"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* 组织机构全称 */}
        <Controller
          name="full_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`create-organization-full_name`}>
                组织机构全称
              </FieldLabel>

              <Input
                {...field}
                id={`create-organization-full_name`}
                aria-invalid={fieldState.invalid}
                placeholder="输入组织机构全称"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* 上级组织机构 */}
        <Controller
          name="parent_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`create-organization-parent_id`}>
                上级组织机构
              </FieldLabel>

              <Input
                {...field}
                id={`create-organization-parent_id`}
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
          name="org_type_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="create-organization-org_type_code">
                  组织类型
                </FieldLabel>
                <FieldDescription>请选择组织类型。</FieldDescription>
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
                  id="create-organization-org_type_code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择组织类型" />
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
          name="org_category_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="create-organization-org_category_code">
                  组织目录
                </FieldLabel>
                <FieldDescription>请选择组织目录。</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                items={categoryOptions}
              >
                <SelectTrigger
                  id="create-organization-org_category_code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择组织目录" />
                </SelectTrigger>
                <SelectContent align="start">
                  {categoryOptions.map((option) => (
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
          name="country_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`create-organization-country_code`}>
                国家
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`create-organization-country_code`}
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
              <FieldLabel htmlFor={`create-organization-province_code`}>
                省份
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`create-organization-province_code`}
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
              <FieldLabel htmlFor={`create-organization-city_code`}>
                城市
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`create-organization-city_code`}
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
              <FieldLabel htmlFor={`create-organization-district_code`}>
                区县
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`create-organization-district_code`}
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
              <FieldLabel htmlFor={`create-organization-address`}>
                详细地址
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-organization-address`}
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
              <FieldLabel htmlFor="form-risk-longitude">经度</FieldLabel>

              <Input
                {...field}
                id="form-risk-longitude"
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
              <FieldLabel htmlFor="form-risk-latitude">纬度</FieldLabel>

              <Input
                {...field}
                id="form-risk-latitude"
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
          form="create-organization-form"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${ENTITY.label}`}
        </Button>
      </div>
    </form>
  )
}
