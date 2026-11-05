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

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"

import {
  updatePermissionSchema,
  type Permission,
} from "@workspace/system/permission"

import { updatePermission } from "@/lib/system/permission/permission.action"

type UpdatePermissionInput = z.input<typeof updatePermissionSchema>
type UpdatePermissionOutput = z.output<typeof updatePermissionSchema>

import {
  PERMISSION_MODULES,
  PERMISSION_MODULE_LABELS,
  PERMISSION_ACTIONS,
  PERMISSION_ACTION_LABELS,
} from "@workspace/system/constants"

interface UpdateFormProps {
  permission: Permission
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(permission: Permission): UpdatePermissionInput {
  return {  
    name: permission.name,
    module: permission.module,
    action: permission.action,
    description: permission.description,
    sort_order: permission.sort_order,
    is_disabled: permission.is_disabled,
  }
}

export default function UpdateForm({
  permission,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<UpdatePermissionInput, unknown, UpdatePermissionOutput>({
    resolver: zodResolver(updatePermissionSchema),
    defaultValues: getDefaultValues(permission),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(permission))
  }, [permission, form.reset])

  async function onSubmit(data: UpdatePermissionOutput) {
    try {
      const result = await updatePermission(permission.id, data)

      if (!result.success) {
        toast.add({
          type: "error",
          title: "更新权限失败",
          description: result.message,
          priority: "high",
        })
        return
      }

      toast.add({
        type: "success",
        title: "更新成功",
        description: "权限信息已更新",
      })

      form.reset(data)

      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error("更新权限请求异常:", error)

      toast.add({
        type: "error",
        title: "更新权限失败",
        description: "发生未知错误，请稍后重试",
        priority: "high",
      })
    }
  }

  function handleReset() {
    form.reset(getDefaultValues(permission))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>更新权限</CardTitle>
        <CardDescription>修改权限的基本信息及状态。</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="update-permission-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            {/* 权限名称 */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-permission-name">权限名称</FieldLabel>

                  <Input
                    {...field}
                    id="update-permission-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="输入权限名称"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="module"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="update-permission-select-module">
                      模块
                    </FieldLabel>
                    <FieldDescription>请选择权限所属的模块。</FieldDescription>
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
                      id="update-permission-select-module"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {PERMISSION_MODULES.map((module) => (
                        <SelectItem key={module} value={module}>
                          {PERMISSION_MODULE_LABELS[module]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="action"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="update-permission-select-action">
                      操作
                    </FieldLabel>
                    <FieldDescription>请选择权限的操作类型。</FieldDescription>
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
                      id="update-permission-select-action"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {PERMISSION_ACTIONS.map((action) => (
                        <SelectItem key={action} value={action}>
                          {PERMISSION_ACTION_LABELS[action]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            {/* 描述 */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-permission-description">
                    描述
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      value={field.value ?? ""}
                      id="update-permission-description"
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
                  <FieldLabel htmlFor="update-permission-sort-order">排序</FieldLabel>

                  <Input
                    id="update-permission-sort-order"
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

            {/* 是否禁用 */}
            <Controller
              name="is_disabled"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="update-permission-is-disabled">
                    是否禁用
                  </FieldLabel>

                  <Switch
                    id="update-permission-is-disabled"
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
          form="update-permission-form"
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </CardFooter>
    </Card>
  )
}
