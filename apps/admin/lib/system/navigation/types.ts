import { Database } from "@/lib/core/database/types";
import { Camelize } from "@/lib/utils/case-converter";
import { LucideIcon } from "lucide-react";

export interface NavMainItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavMainItem[];
}

export type MenuScope =
  | "global"
  | "admin"
  | "tunnel_workspace"
  | "tbm_workspace"
  | "project_workspace";

export type MenuTreeRow = Database["system"]["Views"]["v_menu_tree"]["Row"];

export type MenuTreeItem = Camelize<MenuTreeRow>;

export interface MenuNode {
  id: string;

  parentId: string | null;

  code: string;

  name: string;

  label: string;

  icon: string | null;

  pathUrl: string;

  level: number;

  isLeaf: boolean;

  children?: MenuNode[];
}
