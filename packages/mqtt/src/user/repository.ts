import type {
  MqttUser,
  CreateMqttUserInput,
  UpdateMqttUserInput,
  CreateMqttUserRecordInput,
} from "./schemas"

export interface MqttUserRepository {
  findById(id: number): Promise<MqttUser | null>

  findByUsername(username: string): Promise<MqttUser | null>

  findAll(): Promise<MqttUser[]>

  create(input: CreateMqttUserRecordInput): Promise<void>

  update(id: number, input: UpdateMqttUserInput): Promise<void>

  delete(id: number): Promise<void>

}
