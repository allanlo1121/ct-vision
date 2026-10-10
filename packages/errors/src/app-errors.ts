import { AppError } from "./app-error"
import { ERROR_CODES } from "./error-codes"
import { ERROR_TYPES } from "./error-types"
import type { FieldErrors } from "./types"

export const appErrors = {
  validation(message: string, errors?: FieldErrors) {
    return new AppError({
      message,
      code: ERROR_CODES.VALIDATION_FAILED,
      type: ERROR_TYPES.VALIDATION,
      errors,
    })
  },

  required(field: string, message = "必填字段缺失") {
    return new AppError({
      message,
      code: ERROR_CODES.REQUIRED_FIELD_MISSING,
      type: ERROR_TYPES.VALIDATION,
      errors: {
        [field]: [message],
      },
    })
  },

  notFound(message = "数据不存在") {
    return new AppError({
      message,
      code: ERROR_CODES.NOT_FOUND,
      type: ERROR_TYPES.BUSINESS,
    })
  },

  duplicate(message = "数据已存在") {
    return new AppError({
      message,
      code: ERROR_CODES.DUPLICATE_KEY,
      type: ERROR_TYPES.CONFLICT,
    })
  },

  conflict(message = "数据冲突") {
    return new AppError({
      message,
      code: ERROR_CODES.CONFLICT,
      type: ERROR_TYPES.CONFLICT,
    })
  },

  database(message = "数据库操作失败", cause?: unknown) {
    return new AppError({
      message,
      code: ERROR_CODES.DATABASE_ERROR,
      type: ERROR_TYPES.SYSTEM,
      cause,
    })
  },

  internal(message = "系统内部错误", cause?: unknown) {
    return new AppError({
      message,
      code: ERROR_CODES.INTERNAL_ERROR,
      type: ERROR_TYPES.SYSTEM,
      cause,
    })
  },
  unauthorized(message = "用户未登录") {
    return new AppError({
      message,
      code: ERROR_CODES.UNAUTHORIZED,
      type: ERROR_TYPES.AUTH,
    })
  },

  permissionDenied(message = "没有操作权限") {
    return new AppError({
      message,
      code: ERROR_CODES.PERMISSION_DENIED,
      type: ERROR_TYPES.PERMISSION,
    })
  },
}
