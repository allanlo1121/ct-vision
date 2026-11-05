// app/(dashboard)/proj/layout.tsx

import type { ReactNode } from "react"
import { TreeContainer } from "@/components/tree/tree-container"

import { getOrganizationTree } from "@/lib/hrm/organization/service"

export default async function ProjLayout({
  children,
}: {
  children: ReactNode
}) {
  // const treeData = await getOrganizationTree()

  return (
    <div className="flex h-full min-h-0">
      <aside className="w-64 shrink-0 overflow-y-auto border-r">
        {/* <TreeContainer data={treeData} queryKey="organizationId" /> */}
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
