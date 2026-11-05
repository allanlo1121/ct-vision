"use client"

import * as React from "react"
import { useState } from "react"
import { Eye, EyeOff, RefreshCw, Copy } from "lucide-react"

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

import { Switch } from "@workspace/ui/components/switch"

import { MqttUser } from "@workspace/mqtt/user"
import { createMqttAclSchema } from "@workspace/mqtt/acl"
import type { CreateMqttAclInput } from "@workspace/mqtt/acl"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

import { createMqttAcl } from "@/lib/mqtt/acl/action"
import { TITLE } from "../constants"

import { mqttPermissionOptions, mqttActionOptions } from "@workspace/shared"

interface CreateFormProps {
  user: MqttUser
  onSuccess?: () => void
  onCancel?: () => void
}

export default function CreateForm({
  user,
  onSuccess,
  onCancel,
}: CreateFormProps) {
  const router = useRouter()

  const form = useForm<CreateMqttAclInput>({
    resolver: zodResolver(createMqttAclSchema),
    defaultValues: {
      username: user.username,
      topic: `chengtong/${user.username}/#`,
      action: "publish",
      permission: "allow",
      sort_order: 0,
    },
  })

  async function onSubmit(data: CreateMqttAclInput) {
    try {
      const result = await createMqttAcl(data)

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
        description: `${TITLE}创建成功`,
      })

      form.reset()
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error(`创建${TITLE}请求异常:`, error)
      toast.add({
        type: "error",
        description: `创建${TITLE}失败`,
        priority: "high",
      })
    }
  }
  // function resetForm() {
  //   form.reset(getDefaultValues())
  // }
  function handleCancel() {
    onCancel?.()
  }

  return (
    <form
      id="create-mqtt-acl"
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log("表单验证失败:", errors)
        console.log("当前表单数据:", form.getValues())
      })}
    >
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-mqtt-acl-username">用户名</FieldLabel>
              <Input
                {...field}
                id="create-mqtt-acl-username"
                aria-invalid={fieldState.invalid}
                readOnly
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="topic"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-mqtt-acl-topic">主题</FieldLabel>

              <Input
                {...field}
                id="create-mqtt-acl-topic"
                autoComplete="off"
                placeholder="输入主题"
                aria-invalid={fieldState.invalid}
                className="pr-10"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="action"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-mqtt-acl-action">操作</FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="create-mqtt-acl-action"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择操作" />
                </SelectTrigger>
                <SelectContent align="start">
                  {mqttActionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="permission"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-mqtt-acl-permission">权限</FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="create-mqtt-acl-permission"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择权限" />
                </SelectTrigger>
                <SelectContent align="start">
                  {mqttPermissionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="sort_order"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-mqtt-acl-sort_order">排序</FieldLabel>

              <Input
                {...field}
                id="create-mqtt-acl-sort_order"
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

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-6 flex justify-end gap-2">
        <Button type="button" onClick={handleCancel}>
          取消
        </Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          重置
        </Button>

        <Button
          type="submit"
          form="create-mqtt-acl"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${TITLE}`}
        </Button>
      </div>
    </form>
  )
}
