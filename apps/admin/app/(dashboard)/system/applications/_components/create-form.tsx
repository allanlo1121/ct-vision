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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"


import { createApplicationSchema } from "@workspace/system/application"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { createApplication } from "@/lib/system/application/action"

interface CreateFormProps {
  onSuccess?: () => void
}

export default function CreateForm({ onSuccess }: CreateFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof createApplicationSchema>>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      base_url: "http://",
      icon: "floder",
      sort_order: 99,
    },
  })

  async function onSubmit(data: z.infer<typeof createApplicationSchema>) {
    try {
      const result = await createApplication(data)

      // console.log("Create application result:", result)

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
        description: "应用创建成功",
      })

      form.reset()
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error("创建应用请求异常:", error)
      toast.add({
        type: "error",
        description: "创建应用失败",
        priority: "high",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>新建应用</CardTitle>
        <CardDescription>请填写应用信息以创建新应用。</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-application" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-application-code">
                    应用编码
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-application-code"
                    aria-invalid={fieldState.invalid}
                    placeholder="输入应用编码"
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
                  <FieldLabel htmlFor="form-application-name">
                    应用名称
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-application-name"
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
                  <FieldLabel htmlFor="form-application-base-url">
                    应用地址
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-application-base-url"
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
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-application-description">描述</FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      value={field.value ?? ""}
                      id="form-application-description"
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
              name="icon"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-application-icon">图标</FieldLabel>

                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id="form-application-icon"
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
              name="sort_order"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-application-sort-order">
                    排序
                  </FieldLabel>

                  <Input
                    id="form-application-sort-order"
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
          form="form-application"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : "创建权限"}
        </Button>
      </CardFooter>
    </Card>
  )
}
