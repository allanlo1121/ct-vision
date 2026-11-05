// app/(dashboard)/proj/layout.tsx

import type { ReactNode } from "react"

export default async function ProjLayout({
  children,
}: {
  children: ReactNode
}) {

  return (
    <div className="flex h-full min-h-0">
 

      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
