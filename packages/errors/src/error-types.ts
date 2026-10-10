export const ERROR_TYPES = {
  VALIDATION: "validation",
  BUSINESS: "business",
  PERMISSION: "permission",
  CONFLICT: "conflict",
  SYSTEM: "system",
  AUTH: "auth",
} as const

export type ErrorType =
  (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES]