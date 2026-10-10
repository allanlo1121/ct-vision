import { Json } from "@/lib/core/database/types/database";
import { FavoriteProject } from "../appContext/types";
import { RuntimeUser, RuntimeUserRow } from "../types";

function mapFavoriteProjects(value: Json | null): FavoriteProject[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, Json> => {
      return typeof item === "object" && item !== null && !Array.isArray(item);
    })
    .map((item) => ({
      id: String(item.id ?? ""),
      name: String(item.name ?? ""),
      url: String(item.url ?? ""),
      icon: typeof item.icon === "string" ? item.icon : null,
    }))
    .filter((item) => item.id && item.name && item.url);
}

export function mapRuntimeUser(row: RuntimeUserRow): RuntimeUser {
  return {
    userId: row.user_id!,
    employeeId: row.employee_id!,
    name: row.name!,
    organizationId: row.organization_id!,
    organizationIds: row.organization_ids ?? [],
    roles: row.roles ?? [],
    permissions: row.permissions ?? [],
    favoriteProjects: mapFavoriteProjects(row.favorite_projects),
    isSuperAdmin: row.roles?.includes("SUPER_ADMIN") ?? false,
  };
}
