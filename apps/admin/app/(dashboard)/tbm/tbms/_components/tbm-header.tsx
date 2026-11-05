import { Card, CardContent } from "@workspace/ui/components/card"

import type { Tbm } from "@workspace/tbm/tbm"

interface TbmHeaderCardProps {
  tbm: Tbm

  actions?: React.ReactNode
}

export function TbmHeaderCard({ tbm, actions }: TbmHeaderCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-6">
          {/* left */}
          <div className="flex-1 space-y-5">
            {/* title */}
            <div>
              <div className="text-2xl font-bold tracking-tight">
                {tbm.name}
              </div>
            </div>

            {/* summary */}
            <div className="grid grid-cols-3 gap-x-8 gap-y-4 md:grid-cols-4 lg:grid-cols-6">
              <InfoItem label="编码" value={tbm.code ?? "-"} />
              <InfoItem label="TBM类型" value={tbm.tbm_type_code ?? "-"} />
              <InfoItem
                label="直径"
                value={tbm.diameter ? `${tbm.diameter} m` : "-"}
              />
            </div>
          </div>

          {/* right */}
          {actions && (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-1">
      <div className="text-muted-foreground">{label}</div>

      <div className="font-medium">{value}</div>
    </div>
  )
}
