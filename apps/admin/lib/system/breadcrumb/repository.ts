import { createClient } from "@/lib/infra/supabase/server";

import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { BreadcrumbLabelMap, MenuScope, MenuTreeRow } from "./types";

// export async function getNavigationMenus(menuScope: string): Promise<MenuTreeRow[]> {
//     const supabase = await createClient();

//     const { data, error } = await supabase
//         .schema("system")
//         .from("v_menu_tree")
//         .select("*")
//         .eq("menu_scope", menuScope)
//         .order("sort_order", { ascending: true });

//     assertNoError(error);
//     return data as MenuTreeRow[];
// }

export async function getBreadcrumbLabelMaps(): Promise<BreadcrumbLabelMap> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("system")
    .from("menus")
    .select("label,path_url")
    .order("sort_order", { ascending: true });

  assertNoError(error);

  return (data ?? []).reduce((acc, item) => {
    acc[item.path_url!] = item.label;
    return acc;
  }, {} as BreadcrumbLabelMap);
}

export async function getEntityNameByPath(entity: string, id: string): Promise<string | null> {
  const supabase = await createClient();

  switch (entity) {
    case "tbms": {
      const { data, error } = await supabase
        .schema("tbm")
        .from("tbms")
        .select("name")
        .eq("id", id)
        .maybeSingle();

      assertNoError(error);

      return data?.name ?? null;
    }
    case "tunnels": {
      const { data, error } = await supabase
        .schema("proj")
        .from("tunnels")
        .select("name")
        .eq("id", id)
        .maybeSingle();

      assertNoError(error);

      return data?.name ?? null;
    }
    case "projects": {
      const { data, error } = await supabase
        .schema("proj")
        .from("projects")
        .select("name")
        .eq("id", id)
        .maybeSingle();

      assertNoError(error);

      return data?.name ?? null;
    }

    case "organizations": {
      const { data, error } = await supabase
        .schema("hr")
        .from("organizations")
        .select("name")
        .eq("id", id)
        .maybeSingle();

      assertNoError(error);

      return data?.name ?? null;
    }
    // Add more cases for different entity types as needed
    default:
      return null;
  }
}
