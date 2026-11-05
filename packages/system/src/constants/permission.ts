import type { Database } from "@workspace/supabase/database"

export type PermissionModule =
  Database["iam"]["Enums"]["permission_module"]

export type PermissionAction =
  Database["iam"]["Enums"]["permission_action"]

export const PERMISSION_MODULES = [
  "iam",
  "master_data",
  "hrm",
  "proj",
  "equip",
  "tbm",
] as const satisfies readonly PermissionModule[]

export const PERMISSION_ACTIONS = [
  "read",
  "write",
  "delete",
] as const satisfies readonly PermissionAction[]

export const PERMISSION_MODULE_LABELS: Record<PermissionModule, string> = {
  iam: "身份与权限",
  master_data: "主数据",
  hrm: "人力资源",
  proj: "工程项目",
  equip: "设备管理",
  tbm: "盾构管理",
  mqtt: "MQTT"
}

export const PERMISSION_ACTION_LABELS: Record<PermissionAction, string> = {
  read: "读取",
  write: "写入",
  delete: "删除",
}