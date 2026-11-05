// [code]/layout.tsx

import { tbmRepository } from "@/lib/tbm/tbm/repository"
import { Sidebar } from "../_components/sidebar"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const tbms = await tbmRepository.findAll()

  return (
    <div className="flex min-h-0 flex-1">
      <aside className="w-64 shrink-0 border-r">
        <Sidebar tbms={tbms} />
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
