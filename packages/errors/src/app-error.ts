import type { ErrorCode } from "./error-codes"
import {
  ERROR_TYPES,
  type ErrorType,
} from "./error-types"
import type { FieldErrors } from "./types"

export class AppError extends Error {
  readonly code: ErrorCode
  readonly type: ErrorType
  readonly errors?: FieldErrors
  readonly cause?: unknown

  constructor(options: {
    message: string
    code: ErrorCode
    type?: ErrorType
    errors?: FieldErrors
    cause?: unknown
  }) {
    super(options.message)

    this.name = "AppError"
    this.code = options.code
    this.type = options.type ?? ERROR_TYPES.SYSTEM
    this.errors = options.errors
    this.cause = options.cause
  }
}