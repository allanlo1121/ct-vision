
import type { BreadcrumbItem } from "./types"
import type { MenuNode} from "@workspace/system/menu"


export function findBreadcrumbsByPath(
  pathname: string,
  menus: MenuNode[]
): BreadcrumbItem[] {
  const result: BreadcrumbItem[] = []

  function walk(items: MenuNode[], parents: BreadcrumbItem[] = []): boolean {
    for (const item of items) {
      const href = item.pathUrl
        ? item.pathUrl.startsWith("/")
          ? item.pathUrl
          : `/${item.pathUrl}`
        : undefined

      const current = [
        ...parents,
        {
          label: item.name,
          href,
        },
      ]

      if (href === pathname) {
        result.push(...current)
        return true
      }

      if (item.children?.length) {
        if (walk(item.children, current)) {
          return true
        }
      }
    }

    return false
  }

  walk(menus)

  return result.map((item, index) => ({
    ...item,
    active: index === result.length - 1,
  }))
}