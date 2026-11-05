import type {
  Tbm,
  CreateTbmInput,
  UpdateTbmInput,
  ImportTbmInput,
} from "./schemas"

export interface TbmRepository {
  findByCode(code: string): Promise<Tbm | null>

  //   findOptions(appCode: string): Promise<ProjectOption[]>

  findAll(): Promise<Tbm[]>

  findByDeviceId(deviceId: string): Promise<Tbm | null>

  create(input: CreateTbmInput): Promise<void>

  update(id: string, input: UpdateTbmInput): Promise<void>

  delete(id: string): Promise<void>

  importBatch(inputs: ImportTbmInput[]): Promise<void>
}
