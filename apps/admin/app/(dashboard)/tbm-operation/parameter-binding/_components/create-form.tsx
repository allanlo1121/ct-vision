"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import * as z from "zod"

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

import { createTbmParameterSchema } from "@workspace/tbm/parameter"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

import { ENTITY } from "@/lib/tbm/tbm-parameter"

import { createTbmParameter } from "@/lib/tbm/tbm-parameter/action"

interface CreateFormProps {
  tbmCode: string
  onSuccess?: () => void
  onCancel?: () => void
}

export default function CreateForm({
  tbmCode,
  onSuccess,
  onCancel,
}: CreateFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof createTbmParameterSchema>>({
    resolver: zodResolver(createTbmParameterSchema),
    defaultValues: {
      tbm_code: tbmCode,
      parameter_code: "",
      custom_name: null,
      custom_unit: null,
      value_max: null,
      value_min: null,
      remark: "",
    },
  })

  async function onSubmit(data: z.infer<typeof createTbmParameterSchema>) {
    console.log("Create risk data:", data)
    try {
      const result = await createTbmParameter(data)

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
        description: `${ENTITY.label}创建成功`,
      })

      form.reset()
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error(`创建${ENTITY.label}请求异常:`, error)
      toast.add({
        type: "error",
        description: `创建${ENTITY.label}失败`,
        priority: "high",
      })
    }
  }
  function handleCancel() {
    onCancel?.()
  }

  return (
    <form
      id="form-tbm-parameter"
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log("表单验证失败:", errors)
        console.log("当前表单数据:", form.getValues())
      })}
    >
      <FieldGroup>
        <Controller
          name="tbm_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="form-tbm-parameter-tbm-code">
                  TBM
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>

              <Input
                id="form-tbm-parameter-tbm-code"
                value={field.value}
                readOnly
                aria-invalid={fieldState.invalid}
                className="min-w-[120px]"
              />
            </Field>
          )}
        />
        <Controller
          name="parameter_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tbm-parameter-parameter-code">
                参数编码
              </FieldLabel>

              <Input
                {...field}
                id="form-tbm-parameter-parameter-code"
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
                placeholder="请输入参数编码s100..."
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="custom_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tbm-parameter-custom-name">
                参数别名
              </FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="form-tbm-parameter-custom-name"
                aria-invalid={fieldState.invalid}
                placeholder="输入参数别名"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="custom_unit"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tbm-parameter-custom-unit">
                单位
              </FieldLabel>

              <Input
                {...field}
                id="form-tbm-parameter-custom-unit"
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
                placeholder="输入单位"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="value_max"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tbm-parameter-value-max">
                最大值
              </FieldLabel>

              <Input
                {...field}
                id="form-tbm-parameter-value-max"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type="number"
                min={0}
                step={0.001}
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

        <Controller
          name="value_min"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tbm-parameter-value-min">
                最小值
              </FieldLabel>

              <Input
                {...field}
                id="form-tbm-parameter-value-min"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type="number"
                min={0}
                step={0.001}
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

        <Controller
          name="remark"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tbm-parameter-remark">描述</FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id="form-tbm-parameter-remark"
                  rows={4}
                  maxLength={500}
                  className="min-h-24 resize-none"
                  placeholder="输入描述（选填）"
                  aria-invalid={fieldState.invalid}
                />

                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {(field.value ?? "").length}/500
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>

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
          form="form-tbm-parameter"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "创建中..." : `创建${ENTITY.label}`}
        </Button>
      </div>
    </form>
  )
}
