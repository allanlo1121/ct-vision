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

import { updateTunnelSchema, type Tunnel } from "@workspace/proj/tunnel"

import { updateTunnel } from "@/lib/proj/tunnel/action"
import { TITLE } from "../constants"

type UpdateApplicationInput = z.input<typeof updateTunnelSchema>
type UpdateApplicationOutput = z.output<typeof updateTunnelSchema>

interface UpdateFormProps {
  tunnel: Tunnel
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(tunnel: Tunnel): UpdateApplicationInput {
  return {
    name: tunnel.name,
    overview: tunnel.overview,
    chainage_prefix: tunnel.chainage_prefix,
    start_chainage: tunnel.start_chainage,
    end_chainage: tunnel.end_chainage,
    start_ring: tunnel.start_ring,
    end_ring: tunnel.end_ring,
    chainage_adjustment: tunnel.chainage_adjustment,
    excavation_diameter: tunnel.excavation_diameter,
    sort_order: tunnel.sort_order,
    is_disabled: tunnel.is_disabled,
  }
}

export default function UpdateForm({
  tunnel,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<
    UpdateApplicationInput,
    unknown,
    UpdateApplicationOutput
  >({
    resolver: zodResolver(updateTunnelSchema),
    defaultValues: getDefaultValues(tunnel),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(tunnel))
  }, [tunnel, form.reset])

  async function onSubmit(data: UpdateApplicationOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await updateTunnel(tunnel.id, data)

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
    form.reset(getDefaultValues(tunnel))
  }

  return (
    <form
      id={`update-tunnel-${tunnel.id}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tunnel-name-suffix">
                隧道名称
              </FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="form-tunnel-name-suffix"
                aria-invalid={fieldState.invalid}
                placeholder="输入隧道名称"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="overview"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tunnel-overview">隧道概述</FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id="form-tunnel-overview"
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
        <Controller
          name="chainage_prefix"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tunnel-chainage-prefix">
                桩号前缀
              </FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="form-tunnel-chainage-prefix"
                aria-invalid={fieldState.invalid}
                placeholder="输入桩号前缀"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="start_chainage"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tunnel-start-chainage">
                起始桩号
              </FieldLabel>

              <Input
                {...field}
                id="form-tunnel-start-chainage"
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
          name="start_chainage"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tunnel-start-chainage">
                起始桩号
              </FieldLabel>

              <Input
                {...field}
                id="form-tunnel-start-chainage"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type="number"                
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
          name="end_chainage"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tunnel-end-chainage">
                终止桩号
              </FieldLabel>

              <Input
                {...field}
                id="form-tunnel-end-chainage"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type="number"               
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
          name="chainage_adjustment"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tunnel-chainage-adjustment">
                长链/短链
              </FieldLabel>

              <Input
                {...field}
                id="form-tunnel-chainage-adjustment"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type="number"     
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
          name="start_ring"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tunnel-start-ring">起始环号</FieldLabel>

              <Input
                {...field}
                id="form-tunnel-start-ring"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type="number"
                min={1}
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

        <Controller
          name="end_ring"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tunnel-end-ring">终止环号</FieldLabel>

              <Input
                {...field}
                id="form-tunnel-end-ring"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type="number"
                min={1}
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
        <Controller
          name="excavation_diameter"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-tunnel-excavation-diameter">
                开挖直径
              </FieldLabel>

              <Input
                {...field}
                id="form-tunnel-excavation-diameter"
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

        {/* 是否禁用 */}
        <Controller
          name="is_disabled"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-tunnel-is-disabled-${tunnel.id}`}>
                是否禁用
              </FieldLabel>

              <Switch
                id={`update-tunnel-is-disabled-${tunnel.id}`}
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
          form={`update-tunnel-${tunnel.id}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
