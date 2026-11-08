import { tbmParameterThresholdRepository } from "@/lib/tbm/parameter-threshold/repository"
import { DataTableClient } from "./_components/data-table-client"
import type { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default"

interface Props {
  tbmCode: string
  subsystemCode?: string | null
  options: ParameterThresholdDefaultOptions
}

export default async function ThresholdTable({
  tbmCode,
  subsystemCode = null,
  options,
}: Props) {
  const data = await tbmParameterThresholdRepository.listByTbmCode(
    tbmCode,
    subsystemCode
  )

  return (
    <div className="flex flex-col gap-4">   
      <DataTableClient data={data} options={options} />
    </div>
  )
}
