"use client"

import { useEffect } from "react"
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

import { Input } from "@workspace/ui/components/input"

import { Button } from "@workspace/ui/components/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

import { TunnelPicker } from "./tunnel-picker"

import {
  updateTbmAssignmentSchema,
  type UpdateTbmAssignmentInput,
  type UpdateTbmAssignmentOutput,
  type TbmAssignmentListRow,
} from "@workspace/tbm/tbm"

import { AdvanceDirection, advanceDirectionOptions } from "@workspace/shared"

import { update } from "@/lib/equip/tbm-assignment/action"
import { ENTITY } from "@/lib/equip/tbm-assignment"

interface UpdateFormProps {
  row: TbmAssignmentListRow
  onSuccess?: () => void
  onCancel?: () => void
}

function getDefaultValues(row: TbmAssignmentListRow): UpdateTbmAssignmentInput {
  return {
    tbm_code: row.tbm_code,
    tunnel_id: row.tunnel_id,
    advance_direction: row.advance_direction as AdvanceDirection,
    start_date: row.start_date,
    end_date: row.end_date,
    remark: row.remark,
  }
}

export default function UpdateForm({
  row,
  onSuccess,
  onCancel,
}: UpdateFormProps) {
  const router = useRouter()

  const form = useForm<
    UpdateTbmAssignmentInput,
    unknown,
    UpdateTbmAssignmentOutput
  >({
    resolver: zodResolver(updateTbmAssignmentSchema),
    defaultValues: getDefaultValues(row),
  })

  const { isSubmitting, isDirty } = form.formState

  // 当编辑对象发生变化时，更新表单
  useEffect(() => {
    form.reset(getDefaultValues(row))
  }, [row, form.reset])

  async function onSubmit(data: UpdateTbmAssignmentOutput) {
    // console.log("提交的数据:", data)
    try {
      const result = await update(row.id, data)

      // console.log("更新字典类型结果:", result)

      if (!result.success) {
        toast.add({
          type: "error",
          title: `更新${ENTITY.label}失败`,
          description: result.message,
          priority: "high",
        })
        return
      }

      toast.add({
        type: "success",
        title: `更新${ENTITY.label}成功`,
        description: `${ENTITY.label}信息已更新`,
      })

      form.reset(data)

      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error(`更新${ENTITY.label}请求异常:`, error)

      toast.add({
        type: "error",
        title: `更新${ENTITY.label}失败`,
        description: `发生未知错误，请稍后重试`,
        priority: "high",
      })
    }
  }

  function handleReset() {
    form.reset(getDefaultValues(row))
  }

  return (
    <form
      id={`update-tbm-assignment-${row.id}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <input type="hidden" name="id" value={row.id} />
      <FieldGroup>
        {/* TBM编码 */}
        <Controller
          name="tbm_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-tbm-assignment-${row.id}-tbm_code`}>
                TBM参数编码
              </FieldLabel>

              <Input
                {...field}
                id={`update-tbm-assignment-${row.id}-tbm_code`}
                aria-invalid={fieldState.invalid}
                readOnly
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="tunnel_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-tbm-assignment-${row.id}-tunnel_id`}>
                所属隧道
              </FieldLabel>

              <TunnelPicker
                selectedId={field.value ?? null}
                onChange={field.onChange}
                disabled={field.disabled}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="advance_direction"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`update-tbm-assignment-${row.id}-advanece_direction`}
              >
                掘进方向
              </FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id={`update-tbm-assignment-${row.id}-advanece_direction`}
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="请选择掘进方向" />
                </SelectTrigger>
                <SelectContent align="start">
                  {advanceDirectionOptions.map((option) => (
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
          name="start_date"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={`update-tbm-assignment-${row.id}-start_date`}
              >
                开始日期
              </FieldLabel>
              <Input
                {...field}
                id={`update-tbm-assignment-${row.id}-start_date`}
                type="date"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.currentTarget.value)}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="end_date"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`update-tbm-assignment-${row.id}-end_date`}>
                结束日期
              </FieldLabel>

              <Input
                {...field}
                id={`update-tbm-assignment-${row.id}-end_date`}
                type="date"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.currentTarget.value || null)}
                aria-invalid={fieldState.invalid}
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
              <FieldLabel htmlFor={`update-tbm-assignment-${row.id}-remark`}>
                备注信息
              </FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id={`update-tbm-assignment-${row.id}-remark`}
                  rows={2}
                  maxLength={500}
                  className="min-h-24 resize-none"
                  placeholder="输入备注信息（选填）"
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
          form={`update-tbm-assignment-${row.id}`}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "更新中..." : "保存修改"}
        </Button>
      </div>
    </form>
  )
}
