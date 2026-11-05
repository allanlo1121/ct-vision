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

import { Switch } from "@workspace/ui/components/switch"



import { createMqttUserSchema } from "@workspace/mqtt/user"
import type { CreateMqttUserInput } from "@workspace/mqtt/user"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

import { createMqttUser } from "@/lib/mqtt/user/action"
import { TITLE } from "../constants"
import { generateRandomPassword } from "@workspace/shared/utils"

interface CreateFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function CreateForm({ onSuccess, onCancel }: CreateFormProps) {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<CreateMqttUserInput>({
    resolver: zodResolver(createMqttUserSchema),
    defaultValues: {
      username: "",
      password: generateRandomPassword(),
      is_superuser: false,
      sort_order: 0,
    },
  })
  // 生成新密码
  function regeneratePassword() {
    form.setValue("password", generateRandomPassword(), {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  function getDefaultValues(): CreateMqttUserInput {
    return {
      username: "",
      password: generateRandomPassword(),
      is_superuser: false,
      sort_order: 0,
    }
  }

  async function onSubmit(data: CreateMqttUserInput) {
    try {
      const result = await createMqttUser(data)

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
  function resetForm() {
    form.reset(getDefaultValues())
  }
  function handleCancel() {
    onCancel?.()
  }

  return (
    <form
      id="create-mqtt-user"
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
              <FieldLabel htmlFor="create-mqtt-user-username">
                用户名
              </FieldLabel>
              <Input
                {...field}
                id="create-mqtt-user-username"
                aria-invalid={fieldState.invalid}
                placeholder="输入用户名"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-mqtt-user-password">密码</FieldLabel>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    {...field}
                    id="create-mqtt-user-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="输入密码或随机生成"
                    aria-invalid={fieldState.invalid}
                    className="pr-10"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={regeneratePassword}
                >
                  <RefreshCw className="size-4" />
                  生成
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(field.value)}
                  disabled={!field.value}
                >
                  <Copy className="size-4" />
                </Button>
              </div>

              <FieldDescription>
                可以手动输入密码，也可以随机生成。
                密码创建后将无法从数据库还原。
              </FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* 是否禁用 */}
        <Controller
          name="is_superuser"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`create-mqtt-user-is-superuser`}>
                是否超级用户
              </FieldLabel>

              <Switch
                id={`create-mqtt-user-is-superuser`}
                name={field.name}
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="sort_order"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-mqtt-user-sort_order">
                排序
              </FieldLabel>

              <Input
                {...field}
                id="create-mqtt-user-sort_order"
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
        <Button type="button" variant="outline" onClick={resetForm}>
          重置
        </Button>

        <Button
          type="submit"
          form="create-mqtt-user"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${TITLE}`}
        </Button>
      </div>
    </form>
  )
}
