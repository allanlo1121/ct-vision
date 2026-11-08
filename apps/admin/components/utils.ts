
export function toNumberOrUndefined(
    value: HTMLInputElement
): number | undefined {
    return value.value === "" ? undefined : value.valueAsNumber
}