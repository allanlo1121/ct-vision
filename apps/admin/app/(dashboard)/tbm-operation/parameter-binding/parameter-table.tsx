import { tbmParameterRepository } from "@/lib/tbm/tbm-parameter/repository"
import { DataTableClient } from "./_components/data-table-client"
import type { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default"
interface Props {
  tbmCode: string
  subsystemCode?: string | null
  options: ParameterThresholdDefaultOptions
}

export async function ParameterTable({
  tbmCode,
  subsystemCode = null,
  options,
}: Props) {
  const data = await tbmParameterRepository.findByTbmCode(
    tbmCode,
    subsystemCode
  )

  return (
    <div className="flex flex-col gap-4">
      <DataTableClient data={data} tbmCode={tbmCode} options={options} />
    </div>
  )
}
