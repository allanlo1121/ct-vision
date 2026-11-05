"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import type { z } from "zod"
import type { CodeNameOption } from "@workspace/shared"

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
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import { updateSubsystemSchema, type Subsystem } from "@workspace/tbm/parameter"

import { TITLE } from "../constants"

import { updateSubsystem } from "@/lib/tbm/subsystem/action"

type UpdateSubsystemInput = z.input<typeof updateSubsystemSchema>
type UpdateSubsystemOutput = z.output<typeof updateSubsystemSchema>

interface UpdateFormProps {
  subsystem: Subsystem
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(subsystem: Subsystem): UpdateSubsystemInput {
  return {
    name: subsystem.name,
    description: subsystem.description,
    is_disabled: subsystem.is_disabled,
  }
}

export default function UpdateForm({
  subsystem,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<UpdateSubsystemInput, unknown, UpdateSubsystemOutput>({
    resolver: zodResolver(updateSubsystemSchema),
    defaultValues: getDefaultValues(subsystem),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(subsystem))
  }, [subsystem, form.reset])

  async function onSubmit(data: UpdateSubsystemOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await updateSubsystem(subsystem.code, data)

      // console.log("更新字典类型结果:", result)

      if (!result.success) {
        toast.add({
          type: "error",
          title: `更新${TITLE}失败`,
          description: result.message,
          priority: "high",
        })
        return
      }

      toast.add({
        type: "success",
        title: `更新${TITLE}成功`,
        description: `${TITLE}信息已更新`,
      })

      form.reset(data)

      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error(`更新${TITLE}请求异常:`, error)

      toast.add({
        type: "error",
        title: `更新${TITLE}失败`,
        description: `发生未知错误，请稍后重试`,
        priority: "high",
      })
    }
  }

  function handleReset() {
    form.reset(getDefaultValues(subsystem))
  }

  return (
    <form
      id={`update-subsystem-${subsystem.code}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <input type="hidden" name="code" value={subsystem.code} />
      <FieldGroup>
        {/* 字典类型名称 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-subsystem-${subsystem.code}-name`}>
                字典类型名称
              </FieldLabel>

              <Input
                {...field}
                id={`update-subsystem-${subsystem.code}-name`}
                aria-invalid={fieldState.invalid}
                placeholder="输入字典类型名称"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`update-subsystem-${subsystem.code}-description`}
              >
                描述
              </FieldLabel>

              <Input
                {...field}
                id={`update-subsystem-${subsystem.code}-description`}
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
                placeholder="输入描述（选填）"
                autoComplete="off"
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
              <FieldLabel
                htmlFor={`update-subsystem-is-disabled-${subsystem.code}`}
              >
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-subsystem-is-disabled-${subsystem.code}`}
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
          form={`update-subsystem-${subsystem.code}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
