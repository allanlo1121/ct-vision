import type {
  Tunnel,
  CreateTunnelInput,
  UpdateTunnelInput,
  ImportTunnelInput,
} from "./schemas"

export interface TunnelRepository {
  findById(id: string): Promise<Tunnel | null>

  findAll(): Promise<Tunnel[]>

  findBySectionId(sectionId: string | null): Promise<Tunnel[]>

  create(input: CreateTunnelInput): Promise<void>

  update(id: string, input: UpdateTunnelInput): Promise<void>

  delete(id: string): Promise<void>
}
