// app/(dashboard)/equip/layout.tsx

import type { ReactNode } from "react"

export default async function EquipLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex h-full min-h-0">
      <aside className="w-64 shrink-0 overflow-y-auto border-r">
        {/* <TreeContainer data={treeData} queryKey="organizationId" /> */}
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
