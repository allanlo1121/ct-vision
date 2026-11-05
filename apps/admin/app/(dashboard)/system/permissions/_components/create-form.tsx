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
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@workspace/ui/components/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

import { createPermissionSchema } from "@workspace/system/permission"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { createPermission } from "@/lib/system/permission/permission.action"
import {
  PERMISSION_MODULES,
  PERMISSION_MODULE_LABELS,
  PERMISSION_ACTIONS,
  PERMISSION_ACTION_LABELS
} from "@workspace/system/constants"

interface CreatePermissionFormProps {
  onSuccess?: () => void
}

export default function CreateForm({
  onSuccess,
}: CreatePermissionFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof createPermissionSchema>>({
    resolver: zodResolver(createPermissionSchema),
    defaultValues: {  
      name: "",
      module: "iam",
      action: "read",
      description: "",
      sort_order: 0,
      is_disabled: false,
    },
  })

  async function onSubmit(data: z.infer<typeof createPermissionSchema>) {
    try {
      const result = await createPermission(data)

      console.log("Create permission result:", result)

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
        description: "权限创建成功",
      })

      form.reset()
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error("创建权限请求异常:", error)
      toast.add({
        type: "error",
        description: "创建权限失败",
        priority: "high",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>新建权限</CardTitle>
        <CardDescription>请填写权限信息以创建新权限。</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-rhf-complex" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="permission-name">权限名称</FieldLabel>
                  <Input
                    {...field}
                    id="permission-name"
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
                    <FieldLabel htmlFor="form-rhf-select-module">
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
                      id="form-rhf-select-module"
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
                    <FieldLabel htmlFor="form-rhf-select-action">
                      操作
                    </FieldLabel>
                    <FieldDescription>请选择权限所属的操作。</FieldDescription>
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
                      id="form-rhf-select-action"
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

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="permission-description">描述</FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      value={field.value ?? ""}
                      id="permission-description"
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
                  <FieldLabel htmlFor="permission-sort-order">排序</FieldLabel>

                  <Input
                    id="permission-sort-order"
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
          {form.formState.isSubmitting ? "创建中..." : "创建权限"}
        </Button>
      </CardFooter>
    </Card>
  )
}
