import type {
  ParameterAlarm,
  CreateParameterAlarmInput,
  ApplyParameterAlarmInput,
} from "./alarm.schemas"

export interface ParameterAlarmRepository {
  findById(id: number): Promise<ParameterAlarm | null>

  findByTbmCode(tbmCode: string): Promise<ParameterAlarm[]>

  findAll(): Promise<ParameterAlarm[]>

  create(input: CreateParameterAlarmInput): Promise<void>

  // update(id: number, input: UpdateParameterAlarmInput): Promise<void>

  delete(id: number): Promise<void>

  // upsert(input: CreateParameterAlarmInput): Promise<void>

  applyParameterAlarm(input: ApplyParameterAlarmInput): Promise<number | null>
}
