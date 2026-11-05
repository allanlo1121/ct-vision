"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import type { z } from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

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
  updateApplicationSchema,
  type Application,
} from "@workspace/system/application"

import { updateApplication } from "@/lib/system/application/action"

type UpdateApplicationInput = z.input<typeof updateApplicationSchema>
type UpdateApplicationOutput = z.output<typeof updateApplicationSchema>

interface UpdateFormProps {
  application: Application
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(application: Application): UpdateApplicationInput {
  return {
    name: application.name,
    base_url: application.base_url,
    icon: application.icon,
    description: application.description,
    is_visible: application.is_visible,
    sort_order: application.sort_order,
    is_disabled: application.is_disabled,
  }
}

export default function UpdateForm({
  application,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<
    UpdateApplicationInput,
    unknown,
    UpdateApplicationOutput
  >({
    resolver: zodResolver(updateApplicationSchema),
    defaultValues: getDefaultValues(application),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(application))
  }, [application, form.reset])

  async function onSubmit(data: UpdateApplicationOutput) {

    // console.log("提交的数据:", data)
    try {
      const result = await updateApplication(application.code, data)

      if (!result.success) {
        toast.add({
          type: "error",
          title: "更新应用失败",
          description: result.message,
          priority: "high",
        })
        return
      }

      toast.add({
        type: "success",
        title: "更新成功",
        description: "应用信息已更新",
      })

      form.reset(data)

      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error("更新应用请求异常:", error)

      toast.add({
        type: "error",
        title: "更新应用失败",
        description: "发生未知错误，请稍后重试",
        priority: "high",
      })
    }
  }

  function handleReset() {
    form.reset(getDefaultValues(application))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>更新应用</CardTitle>
        <CardDescription>修改应用的基本信息及状态。</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id={`update-application-${application.code}`}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            {/* 权限名称 */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={`update-application-name-${application.code}`}
                  >
                    应用名称
                  </FieldLabel>

                  <Input
                    {...field}
                    id={`update-application-name-${application.code}`}
                    aria-invalid={fieldState.invalid}
                    placeholder="输入应用名称"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="base_url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={`update-application-base-url-${application.code}`}
                  >
                    应用地址
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`update-application-base-url-${application.code}`}
                    type="url"
                    aria-invalid={fieldState.invalid}
                    placeholder="https://api.example.com/webhook"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="icon"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={`update-application-icon-${application.code}`}
                  >
                    图标
                  </FieldLabel>

                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id={`update-application-icon-${application.code}`}
                    placeholder="输入图标（选填）"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`update-application-description-${application.code}`}>描述</FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      value={field.value ?? ""}
                      id={`update-application-description-${application.code}`}
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* 排序 */}
            <Controller
              name="sort_order"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={`update-application-sort-order-${application.code}`}
                  >
                    排序
                  </FieldLabel>

                  <Input
                    id={`update-application-sort-order-${application.code}`}
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* 是否显示 */}
            <Controller
              name="is_visible"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel
                    htmlFor={`update-application-is-visible-${application.code}`}
                  >
                    是否显示
                  </FieldLabel>

                  <Switch
                    id={`update-application-is-visible-${application.code}`}
                    name={field.name}
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* 是否禁用 */}
            <Controller
              name="is_disabled"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel
                    htmlFor={`update-application-is-disabled-${application.code}`}
                  >
                    是否禁用
                  </FieldLabel>

                  <Switch
                    id={`update-application-is-disabled-${application.code}`}
                    name={field.name}
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="justify-end gap-2">
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
          form={`update-application-${application.code}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </CardFooter>
    </Card>
  )
}
