import { getMenusByScope } from "../../navigation/repository";
import { MenuNode, MenuScope } from "./types";
import { buildMenuTree } from "./mapper";

export async function fetchMenusByCode(menuScope: MenuScope): Promise<MenuNode[]> {
  const menuRows = await getMenusByScope(menuScope);
  const menuItems: MenuNode[] = buildMenuTree(menuRows);

  return menuItems;
}
