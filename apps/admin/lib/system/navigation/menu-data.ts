// apps/frontend/lib/navigation/menu-data.ts

import {
  SquareGanttChart,
  Layers,
  LineChart,
  Radar,
  Siren,
  Database,
  Settings2,
  Map,
  Factory,
  Monitor,
} from "lucide-react";

export const menuData = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/default.png",
  },

  teams: [
    {
      name: "城通公司",
      logo: Factory,
      plan: "Enterprise",
    },
  ],

  navMain: [
    {
      title: "总览大厅",
      url: "/dashboard",
      icon: SquareGanttChart,
      items: [
        { title: "项目总览", url: "/dashboard/projects" },
        { title: "在建隧道", url: "/dashboard/tunnels" },
        { title: "盾构机状态", url: "/dashboard/tbms" },
      ],
    },
    {
      title: "工程结构",
      url: "#",
      icon: Layers,
      items: [
        { title: "项目管理", url: "/projects" },
        { title: "隧道区间", url: "/tunnels" },
        { title: "盾构机列表", url: "/tbms" },
      ],
    },
    {
      title: "实时监控",
      url: "#",
      icon: Monitor,
      items: [
        { title: "实时参数", url: "/realtime/parameters" },
        { title: "PLC 在线状态", url: "/realtime/connectivity" },
        { title: "盾构推进界面", url: "/realtime/control" },
      ],
    },
    {
      title: "历史数据",
      url: "#",
      icon: LineChart,
      items: [
        { title: "运行参数时序", url: "/history/parameters" },
        { title: "环号进度分析", url: "/history/progress" },
        { title: "时效分析", url: "/history/efficiency" },
      ],
    },
    {
      title: "姿态与导向",
      url: "#",
      icon: Radar,
      items: [
        { title: "导向偏差监测", url: "/guidance/deviation" },
        { title: "姿态变化分析", url: "/guidance/attitude" },
        { title: "关键趋势", url: "/guidance/trends" },
      ],
    },
    {
      title: "报警中心",
      url: "#",
      icon: Siren,
      items: [
        { title: "当前报警", url: "/alarm/active" },
        { title: "报警事件", url: "/alarm/events" },
        { title: "规则管理", url: "/alarm/rules" },
        { title: "通知设置", url: "/alarm/notifications" },
      ],
    },
    {
      title: "数据中心",
      url: "#",
      icon: Database,
      items: [
        { title: "参数定义", url: "/data/parameters" },
        { title: "阈值规则", url: "/data/thresholds" },
        { title: "项目信息库", url: "/data/projects" },
      ],
    },
    {
      title: "系统设置",
      url: "#",
      icon: Settings2,
      items: [
        { title: "组织结构", url: "/system/orgs" },
        { title: "人员管理", url: "/system/employees" },
        { title: "权限管理", url: "/system/roles" },
        { title: "系统配置", url: "/system/config" },
      ],
    },
  ],

  projects: [
    {
      name: "华南 · 南珠中 2 标",
      url: "/projects/nz2",
      icon: Map,
    },
    {
      name: "华东 · XX 地铁 1 号线",
      url: "/projects/metro1",
      icon: Map,
    },
    {
      name: "西南 · 高铁盾构区间",
      url: "/projects/railway",
      icon: Map,
    },
  ],
};

import { createClient } from "@/lib/infra/supabase/client";

export async function getUserMenu() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("v_user_menu").select("*");

  if (error) throw error;

  return data;
}
