export function renderNotificationTemplate(
  template: string,
  variables: Record<string, unknown>
): string {
  return template.replace(
    /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g,
    (_, key: string) => {
      const value = variables[key]

      if (value === null || value === undefined) {
        return ""
      }

      return String(value)
    }
  )
}

// const content = renderNotificationTemplate(
//   template.body_template,
//   {
//     project_name: "深大城际2-2标",
//     tbm_name: "CREC988",
//     parameter_name: "前点水平偏差",
//     level_name: "警告",
//     alarm_value: 55.7,
//     ring_no: 816,
//     occurred_at: "2026-11-03 14:30:00",
//   }
// )