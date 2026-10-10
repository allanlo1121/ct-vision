// user/types.ts

import { Database } from "@/lib/core/database/types";
import { FavoriteProject } from "./appContext/types";

export type RuntimeUserRow = Database["public"]["Views"]["v_runtime_user"]["Row"];

export interface RuntimeUser {
  userId: string;
  employeeId: string;
  name: string;
  organizationId: string;
  organizationIds: string[];
  roles: string[];
  permissions: string[];
  favoriteProjects: FavoriteProject[];
  isSuperAdmin: boolean;
}
