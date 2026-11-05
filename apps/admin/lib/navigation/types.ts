
import { LucideIcon } from "lucide-react";

export interface NavMainItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavMainItem[];
}



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

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export type BreadcrumbLabelMap = Record<string, string>;