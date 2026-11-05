// import { buildTree } from "@workspace/shared/tree"
// import type {
//   TreeNode,
//   TreeDataNode,
// } from "@/components/tree"
// import { organizationRepository } from "./repository";

// export async function getOrganizationTree(): Promise<TreeDataNode[]> {
//   const organizations =
//     await organizationRepository.findAllForTree()

//   const parentIds = new Set(
//     organizations
//       .map((org) => org.parentId)
//       .filter((id): id is string => id !== null)
//   )

//   const nodes: TreeNode[] = organizations.map((org) => ({
//     id: org.id,
//     parentId: org.parentId,
//     label: org.name,
//     sortOrder: org.sortOrder,
//     hasChildren: parentIds.has(org.id),
//     isEnabled: !org.isDisabled,
//   }))

//   return buildTree(nodes)
// }