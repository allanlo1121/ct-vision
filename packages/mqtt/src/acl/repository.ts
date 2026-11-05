import type { MqttAcl, CreateMqttAclInput, UpdateMqttAclInput } from "./schemas"

export interface MqttAclRepository {
  findById(id: number): Promise<MqttAcl | null>

  findByUsername(username: string): Promise<MqttAcl[]>

  findAll(): Promise<MqttAcl[]>



  create(input: CreateMqttAclInput): Promise<void>

  update(id: number, input: UpdateMqttAclInput): Promise<void>

  delete(id: number): Promise<void>
}
