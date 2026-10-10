import { MenuNode, MenuTreeRow } from "./types";

export function buildMenuTree(rows: MenuTreeRow[]): MenuNode[] {
  const map = new Map<string, MenuNode>();

  const roots: MenuNode[] = [];

  for (const row of rows) {
    if (!row.id) continue;

    map.set(row.id, {
      id: row.id,

      parentId: row.parent_id,

      code: row.code ?? "",

      name: row.name ?? "",

      label: row.label ?? "",

      icon: row.icon ?? null,

      pathUrl: row.path_url ?? "#",

      level: row.level ?? 0,

      isLeaf: row.is_leaf ?? true,

      children: [],
    });
  }

  for (const node of map.values()) {
    if (node.parentId) {
      map.get(node.parentId)?.children?.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
