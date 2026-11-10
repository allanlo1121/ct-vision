// "use client"

// import * as React from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Controller, useForm } from "react-hook-form"
// import { toast } from "@workspace/ui/components/toast"
// import { useRouter } from "next/navigation"

// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
//   FieldContent,
//   FieldDescription,
// } from "@workspace/ui/components/field"

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectSeparator,
//   SelectTrigger,
//   SelectValue,
// } from "@workspace/ui/components/select"

// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroupTextarea,
// } from "@workspace/ui/components/input-group"

// import { Input } from "@workspace/ui/components/input"
// import { Button } from "@workspace/ui/components/button"

// import { TunnelPicker } from "./tunnel-picker"

// import { create } from "@/lib/equip/tbm-assignment/action"
// import { ENTITY } from "@/lib/equip/tbm-assignment"
// import {
//   type Tbm,
//   type CreateTbmAssignmentInput,
//   createTbmAssignmentSchema,
// } from "@workspace/tbm/tbm"

// import { advanceDirectionOptions } from "@workspace/shared"
// import { getToday } from "@workspace/shared/utils"

// interface CreateFormProps {
//   tbm: Tbm
//   onSuccess?: () => void
//   onCancel?: () => void
// }

// export default function CreateForm({
//   tbm,
//   onSuccess,
//   onCancel,
// }: CreateFormProps) {
//   const router = useRouter()

//   const form = useForm<CreateTbmAssignmentInput>({
//     resolver: zodResolver(createTbmAssignmentSchema),
//     defaultValues: {
//       tbm_code: tbm.code,
//       tunnel_id: "",
//       advance_direction: "increasing",
//       start_date: getToday(),
//       end_date: null,
//       remark: null,
//     },
//   })

//   async function onSubmit(data: CreateTbmAssignmentInput) {
//     try {
//       const result = await create(data)

//       // console.log("Create application result:", result)

//       if (!result.success) {
//         toast.add({
//           type: "error",
//           description: result.message,
//           priority: "high",
//         })
//         return
//       }

//       toast.add({
//         type: "success",
//         description: `${ENTITY.label}创建成功`,
//       })

//       form.reset()
//       router.refresh()
//       onSuccess?.()
//     } catch (error) {
//       console.error(`创建${ENTITY.label}请求异常:`, error)
//       toast.add({
//         type: "error",
//         description: `创建${ENTITY.label}失败`,
//         priority: "high",
//       })
//     }
//   }
//   function handleCancel() {
//     onCancel?.()
//   }

//   return (
//     <form
//       id={`create-tbm-assignment-${tbm.code}`}
//       onSubmit={form.handleSubmit(onSubmit, (errors) => {
//         console.log("表单验证失败:", errors)
//         console.log("当前表单数据:", form.getValues())
//       })}
//     >
//       <FieldGroup>
//         {/* TBM编码 */}
//         <Controller
//           name="tbm_code"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel
//                 htmlFor={`create-tbm-assignment-${tbm.code}-tbm_code`}
//               >
//                 TBM参数编码
//               </FieldLabel>

//               <Input
//                 {...field}
//                 id={`create-tbm-assignment-${tbm.code}-tbm_code`}
//                 aria-invalid={fieldState.invalid}
//                 readOnly
//                 autoComplete="off"
//               />

//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//         <Controller
//           name="tunnel_id"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel
//                 htmlFor={`create-tbm-assignment-${tbm.code}-tunnel_id`}
//               >
//                 所属隧道
//               </FieldLabel>

//               <TunnelPicker
//                 selectedId={field.value ?? null}
//                 onChange={field.onChange}
//                 disabled={field.disabled}
//               />

//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Controller
//           name="advance_direction"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor="create-tbm-assignment-${tbm.code}-severity_code">
//                 告警等级
//               </FieldLabel>

//               <Select
//                 name={field.name}
//                 value={field.value}
//                 onValueChange={field.onChange}
//               >
//                 <SelectTrigger
//                   id="create-tbm-assignment-${tbm.code}-severity_code"
//                   aria-invalid={fieldState.invalid}
//                   className="min-w-[120px]"
//                 >
//                   <SelectValue placeholder="请选择告警等级" />
//                 </SelectTrigger>
//                 <SelectContent align="start">
//                   {advanceDirectionOptions.map((option) => (
//                     <SelectItem key={option.value} value={option.value}>
//                       {option.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Controller
//           name="start_date"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor="create-tbm-assignment-${tbm.code}-start_date">
//                 开始日期
//               </FieldLabel>
//               <Input
//                 {...field}
//                 id="create-tbm-assignment-${tbm.code}-start_date"
//                 type="date"
//                 value={field.value ?? ""}
//                 onChange={(e) => field.onChange(e.currentTarget.value)}
//                 aria-invalid={fieldState.invalid}
//               />

//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Controller
//           name="end_date"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor="create-tbm-assignment-${tbm.code}-end_date">
//                 结束日期
//               </FieldLabel>

//               <Input
//                 {...field}
//                 id="create-tbm-assignment-${tbm.code}-end_date"
//                 type="date"
//                 value={field.value ?? ""}
//                 onChange={(e) => field.onChange(e.currentTarget.value || null)}
//                 aria-invalid={fieldState.invalid}
//               />

//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Controller
//           name="remark"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor="create-tbm-assignment-${tbm.code}-remark">
//                 备注信息
//               </FieldLabel>

//               <InputGroup>
//                 <InputGroupTextarea
//                   {...field}
//                   value={field.value ?? ""}
//                   id="create-tbm-assignment-${tbm.code}-remark"
//                   rows={2}
//                   maxLength={500}
//                   className="min-h-24 resize-none"
//                   placeholder="输入备注信息（选填）"
//                   aria-invalid={fieldState.invalid}
//                 />

//                 <InputGroupAddon align="block-end">
//                   <InputGroupText className="tabular-nums">
//                     {(field.value ?? "").length}/500
//                   </InputGroupText>
//                 </InputGroupAddon>
//               </InputGroup>

//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//       </FieldGroup>

//       <div className="mt-6 flex justify-end gap-2">
//         <Button type="button" onClick={handleCancel}>
//           取消
//         </Button>
//         <Button type="button" variant="outline" onClick={() => form.reset()}>
//           重置
//         </Button>

//         <Button
//           type="submit"
//           form={`create-tbm-assignment-${tbm.code}`}
//           disabled={form.formState.isSubmitting}
//         >
//           {form.formState.isSubmitting ? "创建中..." : `创建${ENTITY.label}`}
//         </Button>
//       </div>
//     </form>
//   )
// }
