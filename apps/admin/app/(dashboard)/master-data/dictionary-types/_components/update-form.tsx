"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import type { z } from "zod"

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
  updateDictionaryTypeSchema,
  type DictionaryType,
} from "@workspace/master-data/dictionary-type"

import { updateDictionaryType } from "@/lib/master-data/dictionary-type/action"
import { TITLE } from "../constants"

type UpdateApplicationInput = z.input<typeof updateDictionaryTypeSchema>
type UpdateApplicationOutput = z.output<typeof updateDictionaryTypeSchema>

interface UpdateFormProps {
  dictionaryType: DictionaryType
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(
  dictionaryType: DictionaryType
): UpdateApplicationInput {
  return {
    name: dictionaryType.name,
    description: dictionaryType.description,
    is_disabled: dictionaryType.is_disabled,
  }
}

export default function UpdateForm({
  dictionaryType,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<
    UpdateApplicationInput,
    unknown,
    UpdateApplicationOutput
  >({
    resolver: zodResolver(updateDictionaryTypeSchema),
    defaultValues: getDefaultValues(dictionaryType),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(dictionaryType))
  }, [dictionaryType, form.reset])

  async function onSubmit(data: UpdateApplicationOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await updateDictionaryType(dictionaryType.code, data)

      console.log("更新字典类型结果:", result)

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
    form.reset(getDefaultValues(dictionaryType))
  }

  return (
    <form
      id={`update-dictionary-type-${dictionaryType.code}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        {/* 字典类型名称 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`update-dictionary-type-name-${dictionaryType.code}`}
              >
                字典类型名称
              </FieldLabel>

              <Input
                {...field}
                id={`update-dictionary-type-name-${dictionaryType.code}`}
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
                htmlFor={`update-dictionary-type-description-${dictionaryType.code}`}
              >
                描述
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id={`update-dictionary-type-description-${dictionaryType.code}`}
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
                htmlFor={`update-dictionary-type-is-disabled-${dictionaryType.code}`}
              >
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-dictionary-type-is-disabled-${dictionaryType.code}`}
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

      <div className="flex justify-end gap-2 mt-6">
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
          form={`update-dictionary-type-${dictionaryType.code}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
