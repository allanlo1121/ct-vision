import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function PageHeader({
  title,
  backHref,
  actions,
}: {
  title: string
  backHref?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {backHref && (
          <Button
            variant="outline"
            size="icon"
            render={() => (
              <Link href={backHref}>
                <ArrowLeft className="size-4" />
              </Link>
            )}
          ></Button>
        )}

        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      {actions}
    </div>
  )
}
