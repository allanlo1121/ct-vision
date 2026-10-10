import type { PostgrestError } from "@supabase/supabase-js"

import { AppError, ERROR_CODES, ERROR_TYPES } from "@workspace/errors"

export function assertNoError(
  error: PostgrestError | null
): asserts error is null {
  if (!error) {
    return
  }

  switch (error.code) {
    case "23505":
      throw new AppError({
        message: "数据已存在",
        code: ERROR_CODES.DUPLICATE_KEY,
        type: ERROR_TYPES.CONFLICT,
        cause: error,
      })

    case "23503":
      throw new AppError({
        message: "关联数据不存在或仍被其他数据引用",
        code: ERROR_CODES.CONFLICT,
        type: ERROR_TYPES.CONFLICT,
        cause: error,
      })

    case "23502":
      throw new AppError({
        message: "必填字段不能为空",
        code: ERROR_CODES.VALIDATION_FAILED,
        type: ERROR_TYPES.VALIDATION,
        cause: error,
      })

    default:
      throw new AppError({
        message: error.message,
        code: ERROR_CODES.DATABASE_ERROR,
        type: ERROR_TYPES.SYSTEM,
        cause: error,
      })
  }
}
