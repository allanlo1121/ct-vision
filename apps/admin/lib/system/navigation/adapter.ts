// lib/domain/system/navigation/adapter.ts

import * as Icons from "lucide-react";

import { CircleHelp, type LucideIcon } from "lucide-react";

export function resolveIcon(icon?: string | null): LucideIcon {
  if (!icon) {
    return CircleHelp;
  }

  const resolved = Icons[icon as keyof typeof Icons];

  if (!resolved) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Icon "${icon}" not found`);
    }

    return CircleHelp;
  }

  return resolved as LucideIcon;
}

export function normalizePath(path?: string | null) {
  if (!path) return "#";
  return path.startsWith("/") ? path : `/${path}`;
}

export function joinPath(baseUrl: string, pathUrl?: string | null) {
  if (!pathUrl) return "#";

  if (pathUrl.startsWith("/")) {
    console.warn("pathUrl should not start with '/'", pathUrl);
  }

  const base = baseUrl.replace(/\/$/, "");
  const path = pathUrl.replace(/^\//, "");

  return `${base}/${path}`;
}
