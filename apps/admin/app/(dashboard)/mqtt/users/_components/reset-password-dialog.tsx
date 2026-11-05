"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react"
import { z } from "zod"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field"

import { toast } from "@workspace/ui/components/toast"
import { generateRandomPassword } from "@workspace/shared/utils"
import { resetMqttUserPassword } from "@/lib/mqtt/user/action"
import { MqttUser } from "@workspace/mqtt/user"

// 建议后续移到模块 schemas 中
const resetPasswordSchema = z.object({
  password: z.string().min(8, "密码至少需要 8 位"),
})

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

type ResetPasswordDialogProps = {
  user: MqttUser
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

// 浏览器安全随机数

export function ResetPasswordDialog({
  user,
  open,
  onOpenChange,
  onSuccess,
}: ResetPasswordDialogProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const { isSubmitting } = form.formState

  function handleOpenChange(nextOpen: boolean) {
    if (isSubmitting) return

    if (!nextOpen) {
      form.reset()
      setShowPassword(false)
    }

    onOpenChange(nextOpen)
  }

  function handleGeneratePassword() {
    form.setValue("password", generateRandomPassword(), {
      shouldDirty: true,
      shouldValidate: true,
    })

    setShowPassword(true)
  }

  async function handleCopyPassword() {
    const password = form.getValues("password")
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)

      toast.add({
        type: "success",
        description: "密码已复制",
      })
    } catch {
      toast.add({
        type: "error",
        description: "复制失败，请手动复制",
      })
    }
  }

  async function onSubmit(data: ResetPasswordInput) {
    try {
      const result = await resetMqttUserPassword(user.id, data.password)

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
        description: "MQTT 用户密码重置成功",
      })

      form.reset()
      setShowPassword(false)
      onOpenChange(false)

      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error("重置 MQTT 用户密码失败:", error)

      toast.add({
        type: "error",
        description: "重置密码失败",
        priority: "high",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>重置 MQTT 用户密码</DialogTitle>
          <DialogDescription>
            为用户 {user.username} 设置新密码。
            重置后，设备需要使用新密码重新连接。
          </DialogDescription>
        </DialogHeader>

        <form
          id="reset-mqtt-password"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="reset-mqtt-password-input">
                  新密码
                </FieldLabel>

                <div className="flex items-center gap-2">
                  <div className="relative min-w-0 flex-1">
                    <Input
                      {...field}
                      id="reset-mqtt-password-input"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="输入或生成新密码"
                      aria-invalid={fieldState.invalid}
                      className="pr-10"
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "隐藏密码" : "显示密码"}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleGeneratePassword}
                    title="生成随机密码"
                    aria-label="生成随机密码"
                  >
                    <RefreshCw className="size-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleCopyPassword}
                    disabled={!field.value}
                    title="复制密码"
                    aria-label="复制密码"
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <p className="text-xs text-muted-foreground">
            密码至少 8 位。重置成功后，原密码将失效。 请妥善保存新密码。
          </p>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting}
          >
            取消
          </Button>

          <Button
            type="submit"
            form="reset-mqtt-password"
            disabled={isSubmitting}
          >
            {isSubmitting ? "重置中..." : "确认重置"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
