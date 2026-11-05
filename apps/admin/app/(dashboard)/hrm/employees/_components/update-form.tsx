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

import {
  updateDictionaryItemSchema,
  type DictionaryItem,
} from "@workspace/master-data/dictionary-item"

import { updateDictionaryItem } from "@/lib/master-data/dictionary-item/action"
import { TITLE } from "../constants"

type UpdateApplicationInput = z.input<typeof updateDictionaryItemSchema>
type UpdateApplicationOutput = z.output<typeof updateDictionaryItemSchema>

interface UpdateFormProps {
  dictionaryItem: DictionaryItem
  dictionaryTypeOptions: CodeNameOption[]
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(
  dictionaryItem: DictionaryItem
): UpdateApplicationInput {
  return {
    dictionary_type_code: dictionaryItem.dictionary_type_code,
    name: dictionaryItem.name,
    description: dictionaryItem.description,
    is_disabled: dictionaryItem.is_disabled,
  }
}

export default function UpdateForm({
  dictionaryItem,
  dictionaryTypeOptions,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<
    UpdateApplicationInput,
    unknown,
    UpdateApplicationOutput
  >({
    resolver: zodResolver(updateDictionaryItemSchema),
    defaultValues: getDefaultValues(dictionaryItem),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(dictionaryItem))
  }, [dictionaryItem, form.reset])

  async function onSubmit(data: UpdateApplicationOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await updateDictionaryItem(dictionaryItem.code, data)

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
    form.reset(getDefaultValues(dictionaryItem))
  }

  const typeOptions = dictionaryTypeOptions.map((option) => ({
  value: option.code,
  label: `${option.code} ${option.name}`,
}))

  return (
    <form
      id={`update-dictionary-item-${dictionaryItem.code}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
          <Controller
          name="dictionary_type_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="form-dictionary-item-dictionary-type-code">
                  字典类型
                </FieldLabel>
                <FieldDescription>请选择字典类型。</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                 items={typeOptions}
              >
                <SelectTrigger
                  id="form-dictionary-item-dictionary-type-code"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择字典类型" />
                </SelectTrigger>
                <SelectContent align="start">
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                       {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        {/* 字典类型名称 */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`update-dictionary-item-name-${dictionaryItem.code}`}
              >
                字典类型名称
              </FieldLabel>

              <Input
                {...field}
                id={`update-dictionary-item-name-${dictionaryItem.code}`}
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
                htmlFor={`update-dictionary-item-description-${dictionaryItem.code}`}
              >
                描述
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id={`update-dictionary-item-description-${dictionaryItem.code}`}
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
                htmlFor={`update-dictionary-item-is-disabled-${dictionaryItem.code}`}
              >
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-dictionary-item-is-disabled-${dictionaryItem.code}`}
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
          form={`update-dictionary-item-${dictionaryItem.code}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
