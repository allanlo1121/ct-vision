
import type { ApiSuccess, ApiError } from "./api.schemas"

export function apiSuccess<T>(data: T): ApiSuccess<T> {
    return {
        success: true,
        data,
    }
}

export function apiError(
    code: string,
    message: string,
    options?: {
        requestId?: string
        details?: ApiError["details"]
    }
): ApiError {
    return {
        success: false,
        code,
        message,
        ...options,
    }
}