import type {
  TunnelRiskState,
  CreateTunnelRiskStateInput,
  UpdateTunnelRiskStateInput,
} from "./risk.schemas"

export interface TunnelRiskStateRepository {
  findByTbmAndRisk(
    tbmCode: string,
    riskId: string
  ): Promise<TunnelRiskState | null>

  findByTbmCode(tbmCode: string): Promise<TunnelRiskState | null>

  findAll(): Promise<TunnelRiskState[]>

  create(input: CreateTunnelRiskStateInput): Promise<void>

  update(id: number, input: UpdateTunnelRiskStateInput): Promise<void>

  delete(id: number): Promise<void>
}
