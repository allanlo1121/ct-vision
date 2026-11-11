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
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import {
  updateOrganizationSchema,
  type UpdateOrganizationInput,
  type UpdateOrganizationOutput,
  type Organization,
} from "@workspace/hrm/organization"

import { update } from "@/lib/hrm/organization/action"
import { ENTITY, type OrganizationOptions } from "@/lib/hrm/organization"

interface UpdateFormProps {
  row: Organization
  options: OrganizationOptions
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(row: Organization): UpdateOrganizationInput {
  return updateOrganizationSchema.parse(row)
}

export default function UpdateForm({
  row,
  options,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<
    UpdateOrganizationInput,
    unknown,
    UpdateOrganizationOutput
  >({
    resolver: zodResolver(updateOrganizationSchema),
    defaultValues: getDefaultValues(row),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(row))
  }, [row, form.reset])

  async function onSubmit(data: UpdateOrganizationOutput) {
    try {
      const result = await update(row.id, data)

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

  const typeOptions = options.orgTypeOptions?.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

    const categoryOptions = options.orgCategoryOptions?.map((option) => ({
    value: option.code,
    label: `${option.code} ${option.name}`,
  }))

  return (
    <form
      id={`update-organization-${row.id}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        {/* 组织机构简称 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-organization-name-${row.id}`}>
                组织机构名称
              </FieldLabel>

              <Input
                {...field}
                id={`update-organization-name-${row.id}`}
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
              <FieldLabel htmlFor={`update-organization-code-${row.id}`}>
                组织机构编码
              </FieldLabel>

              <Input
                {...field}
                id={`update-organization-code-${row.id}`}
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
              <FieldLabel htmlFor={`update-organization-full_name-${row.id}`}>
                组织机构全称
              </FieldLabel>

              <Input
                {...field}
                id={`update-organization-full_name-${row.id}`}
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
              <FieldLabel htmlFor={`update-organization-parent_id-${row.id}`}>
                上级组织机构
              </FieldLabel>

              <Input
                {...field}
                id={`update-organization-parent_id-${row.id}`}
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
                <FieldLabel htmlFor="form-organization-org_type_code">
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
                  id="form-organization-org_type_code"
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
                <FieldLabel htmlFor="form-organization-org_category_code">
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
                  id="form-organization-org_category_code"
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
              <FieldLabel
                htmlFor={`update-organization-country_code-${row.id}`}
              >
                国家
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-organization-country_code-${row.id}`}
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
              <FieldLabel
                htmlFor={`update-organization-province_code-${row.id}`}
              >
                省份
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-organization-province_code-${row.id}`}
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
              <FieldLabel htmlFor={`update-organization-city_code-${row.id}`}>
                城市
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-organization-city_code-${row.id}`}
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
              <FieldLabel
                htmlFor={`update-organization-${row.id}-district_code`}
              >
                区县
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-organization-${row.id}-district_code`}
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
              <FieldLabel htmlFor={`update-organization-address-${row.id}`}>
                详细地址
              </FieldLabel>

              <Input
                {...field}
                value={field.value ?? ""}
                id={`update-organization-address-${row.id}`}
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
              <FieldLabel htmlFor={`update-organization-${row.id}-longitude`}>经度</FieldLabel>

              <Input
                {...field}
                id={`update-organization-${row.id}-longitude`}
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
              <FieldLabel htmlFor={`update-organization-${row.id}-latitude`}>纬度</FieldLabel>

              <Input
                {...field}
                id={`update-organization-${row.id}-latitude`}
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
              <FieldLabel htmlFor={`update-organization-is-disabled-${row.id}`}>
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-organization-is-disabled-${row.id}`}
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
          form={`update-organization-${row.id}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
