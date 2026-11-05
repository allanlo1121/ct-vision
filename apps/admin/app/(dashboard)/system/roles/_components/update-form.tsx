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
} from "@workspace/ui/components/field"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"

import { updateRoleSchema, type Role } from "@workspace/system/role"

import { updateRole } from "@/lib/system/permission/role.action"

type UpdateRoleInput = z.input<typeof updateRoleSchema>
type UpdateRoleOutput = z.output<typeof updateRoleSchema>

interface UpdateFormProps {
  role: Role
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(role: Role): UpdateRoleInput {
  return {
    code: role.code,
    name: role.name,
    description: role.description,
    sort_order: role.sort_order,
    is_disabled: role.is_disabled,
  }
}

export default function UpdateForm({
  role,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<UpdateRoleInput, unknown, UpdateRoleOutput>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: getDefaultValues(role),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(role))
  }, [role, form.reset])

  async function onSubmit(data: UpdateRoleOutput) {
    try {
      const result = await updateRole(role.id, data)

      if (!result.success) {
        toast.add({
          type: "error",
          title: "更新角色失败",
          description: result.message,
          priority: "high",
        })
        return
      }

      toast.add({
        type: "success",
        title: "更新成功",
        description: "角色信息已更新",
      })

      form.reset(data)

      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error("更新角色请求异常:", error)

      toast.add({
        type: "error",
        title: "更新角色失败",
        description: "发生未知错误，请稍后重试",
        priority: "high",
      })
    }
  }

  function handleReset() {
    form.reset(getDefaultValues(role))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>更新角色</CardTitle>
        <CardDescription>修改角色的基本信息及状态。</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="update-role-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* 角色编码 */}
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-role-code">角色编码</FieldLabel>

                  <Input
                    {...field}
                    id="update-role-code"
                    aria-invalid={fieldState.invalid}
                    placeholder="例如 PROJECT_ADMIN"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* 角色名称 */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-role-name">角色名称</FieldLabel>

                  <Input
                    {...field}
                    id="update-role-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="输入角色名称"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* 描述 */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-role-description">
                    描述
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      value={field.value ?? ""}
                      id="update-role-description"
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
                  <FieldLabel htmlFor="update-role-sort-order">排序</FieldLabel>

                  <Input
                    id="update-role-sort-order"
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
                  <FieldLabel htmlFor="update-role-is-disabled">
                    是否禁用
                  </FieldLabel>

                  <Switch
                    id="update-role-is-disabled"
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
          form="update-role-form"
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </CardFooter>
    </Card>
  )
}
