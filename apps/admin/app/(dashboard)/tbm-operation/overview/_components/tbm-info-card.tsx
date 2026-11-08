import { tbmRepository } from "@/lib/equip/tbm/repository"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@workspace/ui/components/card"

interface Props {
  tbmCode: string
}

export async function TbmInfoCard({ tbmCode }: Props) {
  const tbm = await tbmRepository.findByCode(tbmCode)

  if (!tbm) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tbm.name}</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-4">
        <div>
          <p className="text-sm text-muted-foreground">设备编码</p>
          <p className="font-medium">{tbm.code}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">设备直径</p>
          <p className="font-medium">
            {tbm.diameter == null ? "-" : `${tbm.diameter} m`}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">设备类型</p>
          <p className="font-medium">{tbm.tbm_type_code}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">设备ID</p>
          <p className="font-medium">{tbm.device_id ?? "-"}</p>
        </div>
      </CardContent>
    </Card>
  )
}
