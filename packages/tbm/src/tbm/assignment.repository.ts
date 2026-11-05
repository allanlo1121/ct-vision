import type {
  TbmAssignment,
  CreateTbmAssignmentInput,
  UpdateTbmAssignmentInput,
} from "./assignment.schemas"
import type { TbmAssignmentListRow, TbmAssignmentContext } from "./types"

export interface TbmAssignmentRepository {
  findById(id: string): Promise<TbmAssignment | null>

  findByTbmCode(tbmCode: string): Promise<TbmAssignment[]>

  findByTunnelId(tunnelId: string): Promise<TbmAssignment[]>

  findCurrent(tbmCode: string): Promise<TbmAssignment | null>

  listCurrent(): Promise<TbmAssignment[]>

  // findAll(): Promise<TbmAssignment[]>

  listAll(): Promise<TbmAssignmentListRow[]>

  create(input: CreateTbmAssignmentInput): Promise<void>

  update(id: string, input: UpdateTbmAssignmentInput): Promise<void>

  delete(id: string): Promise<void>
}

export interface TbmAssignmentListRepository {
  findById(id: string): Promise<TbmAssignmentListRow | null>

  findByTbmCode(tbmCode: string): Promise<TbmAssignmentListRow[]>

  findByTunnelId(tunnelId: string): Promise<TbmAssignmentListRow[]>

  findCurrent(tbmCode: string): Promise<TbmAssignmentListRow | null>

  listCurrent(): Promise<TbmAssignmentListRow[]>

  listAll(): Promise<TbmAssignmentListRow[]>
}

export interface TbmAssignmentCurrentRepository {
  findById(id: string): Promise<TbmAssignmentContext | null>

  findByTbmCode(tbmCode: string): Promise<TbmAssignmentContext| null>

  findByTunnelId(tunnelId: string): Promise<TbmAssignmentContext| null>

  list(): Promise<TbmAssignmentContext[]>
}
