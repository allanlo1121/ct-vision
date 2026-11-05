import type { Device, CreateDeviceInput, UpdateDeviceInput } from "./schemas"

export interface DeviceRepository {
  findById(id: string): Promise<Device | null>

  //   findOptions(appCode: string): Promise<ProjectOption[]>

  findAll(): Promise<Device[]>

  create(input: CreateDeviceInput): Promise<void>

  update(id: string, input: UpdateDeviceInput): Promise<void>

  delete(id: string): Promise<void>
}
