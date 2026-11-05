import { z } from "zod"

export const scopeTypeSchema = z.enum([
    "self",
    "subtree"
])

export type ScopeType = z.infer<
    typeof scopeTypeSchema
>

export const ScopeTypeLabels: Record<
    ScopeType,
    string
> = {
    self: "仅本组织",
    subtree: "本组织及下级组织"
}

export const ScopeTypeOptions =
    scopeTypeSchema.options.map((value) => ({
        value,
        label: ScopeTypeLabels[value],
    }))
