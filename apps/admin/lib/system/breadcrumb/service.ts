import { getBreadcrumbLabelMaps, getEntityNameByPath } from "./repository";
import { BreadcrumbLabelMap } from "./types";

export async function fetchBreadcrumbLabelMaps(): Promise<BreadcrumbLabelMap> {
  return await getBreadcrumbLabelMaps();
}

export async function fetchEntityNameByPath(
  entity: string,
  id: string
): Promise<BreadcrumbLabelMap> {
  const name = await getEntityNameByPath(entity, id);

  if (!name) {
    return {};
  }

  return {
    [id]: name,
  };
}
