import { AppError } from "./app-error"

export function getErrorMessage(
  error: unknown,
  fallback = "未知错误"
): string {
  if (error instanceof AppError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === "string") {
    return error
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    return String(
      (error as { message?: unknown }).message ?? fallback
    )
  }

  return fallback
}