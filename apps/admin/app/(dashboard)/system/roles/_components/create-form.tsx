"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import * as z from "zod"

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
  FieldLabel
} from "@workspace/ui/components/field"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

import { createRoleSchema } from "@workspace/system/role"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { createRole } from "@/lib/system/permission/role.action"

interface CreateRoleFormProps {
  onSuccess?: () => void
}


export default function CreateForm({ onSuccess }: CreateRoleFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof createRoleSchema>>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      sort_order: 0,
      is_disabled: false,
    },
  })

  async function onSubmit(data: z.infer<typeof createRoleSchema>) {
    try {
      const result = await createRole(data)

      console.log("Create role result:", result)

      if (!result.success) {
          console.log("准备显示错误 Toast")
        toast.add({
          type: "error",
          description: result.message,
          priority: "high",
        })
        return
      }

      toast.add({
        type: "success",
        description: "角色创建成功",
      })

      form.reset()
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error("创建角色请求异常:", error)
      toast.add({
        type: "error",
        description: "创建角色失败",
        priority: "high",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>新建角色</CardTitle>
        <CardDescription>请填写角色信息以创建新角色。</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-rhf-complex" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="role-code">角色编码</FieldLabel>
                  <Input
                    {...field}
                    id="role-code"
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

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="role-name">角色名称</FieldLabel>
                  <Input
                    {...field}
                    id="role-name"
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

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="role-description">描述</FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      value={field.value ?? ""}
                      id="role-description"
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

            <Controller
              name="sort_order"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="role-sort-order">排序</FieldLabel>

                  <Input
                    id="role-sort-order"
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
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          重置
        </Button>

        <Button
          type="submit"
          form="form-rhf-complex"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : "创建角色"}
        </Button>
      </CardFooter>
    </Card>
  )
}
