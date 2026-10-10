"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@workspace/ui/components/field"

import { createRoleSchema } from "@workspace/system/role"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { TableCell, TableRow } from "@workspace/ui/components/table"

type Props = {
  tunnelId: string
  defaultStartRingNo: number
  onCancel: () => void
  onSuccess: () => void
}

export function RoleRowForm({ onCancel, onSuccess }: Props) {
  const form = useForm<z.infer<typeof createRoleSchema>>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      sort_order: 0,
      is_disabled: false,
    },
  })

  function onSubmit(data: z.infer<typeof createRoleSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <form id="form-rhf-complex" onSubmit={form.handleSubmit(onSubmit)}>
      <Field>
        <TableCell>
          <Controller
            name="code"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="form-rhf-complex-code"
                  aria-invalid={fieldState.invalid}
                  placeholder="编码"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </TableCell>
        <TableCell>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="form-rhf-complex-name"
                  type="text"
              
                  aria-invalid={fieldState.invalid}
                  placeholder="输入名称"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </TableCell>
        <TableCell>
          <Controller
            name="end_ring_no"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="form-rhf-demo-end-ring-no"
                  type="number"
                  min={1}
                  step={1}
                  aria-invalid={fieldState.invalid}
                  placeholder="1"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </TableCell>
        <TableCell>
          <Controller
            name="ring_width"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="form-rhf-demo-ring-width"
                  type="number"
                  min={0}
                  step={0.1}
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  placeholder="1"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </TableCell>

        <TableCell>
          <Controller
            name="outer_diameter"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="form-rhf-demo-outer-diameter"
                  aria-invalid={fieldState.invalid}
                  type="number"
                  min={0}
                  step={0.01}
                  value={field.value ?? ""}
                  placeholder="1"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </TableCell>
        <TableCell>
          <Controller
            name="inner_diameter"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="form-rhf-demo-inner-diameter"
                  aria-invalid={fieldState.invalid}
                  type="number"
                  min={0}
                  step={0.01}
                  value={field.value ?? ""}
                  placeholder="1"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </TableCell>
        <TableCell>
          <Controller
            name="thickness"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="form-rhf-demo-thickness"
                  type="number"
                  min={0}
                  step={0.01}
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                  placeholder="1"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </TableCell>
        <TableCell>
          <Controller
            name="remark"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Textarea
                  {...field}
                  id="form-rhf-textarea-remark"
                  aria-invalid={fieldState.invalid}
                  placeholder="I'm a software engineer..."
                  className="min-h-[120px]"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </TableCell>
      </Field>
    </form>
  )
}
