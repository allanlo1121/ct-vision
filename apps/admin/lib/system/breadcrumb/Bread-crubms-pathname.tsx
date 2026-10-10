import { BreadcrumbItem, BreadcrumbLabelMap } from "./types";
import { isUuid } from "@/lib/utils";

export function buildBreadcrumbsFromPathname({
  pathname,
  breadcrumbMap,
}: {
  pathname: string;
  breadcrumbMap: BreadcrumbLabelMap;
}): BreadcrumbItem[] {
  // console.log("Building breadcrumbs from pathname:", pathname);
  // console.log("Using breadcrumb map:", breadcrumbMap);
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  let currentPath = "";
  let relativePath = "";
  let afterEntity = false;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;

    // console.log(`Processing segment: ${segment}, currentPath: ${currentPath}`);

    let label: string | undefined;

    if (isUuid(segment)) {
      label = breadcrumbMap[segment];

      afterEntity = true;
      relativePath = "";
    } else {
      if (afterEntity) {
        relativePath = relativePath ? `${relativePath}/${segment}` : segment;

        label = breadcrumbMap[relativePath];
      } else {
        label = breadcrumbMap[currentPath];
      }
    }

    breadcrumbs.push({
      label: label ?? segment,
      href: currentPath,
    });
  }

  return breadcrumbs.map((item, index) => ({
    ...item,
    active: index === breadcrumbs.length - 1,
  }));
}
