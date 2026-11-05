// tbm-Connection.repository.ts

import { pgPool } from "../../db/pg.pool"
import type { ConnectionType, TbmConnectionState } from "./types"

const BASE_QUERY = `
  select
    c.tbm_code as "tbmCode",

    coalesce(
      bool_or(c.is_online) filter (where c.type = 'heartbeat'),
      false
    ) as "isHeartbeatOnline",

    coalesce(
      bool_or(c.is_online) filter (where c.type = 'realdata'),
      false
    ) as "isRealdataOnline",

    max(c.last_seen_at) filter (
      where c.type = 'heartbeat'
    ) as "lastHeartbeatAt",

    max(c.last_seen_at) filter (
      where c.type = 'realdata'
    ) as "lastRealdataAt"

  from runtime.tbm_connection_status c

`

export interface ITbmConnectionStateRepository {
  getAll(): Promise<TbmConnectionState[]>
  get(tbmCode: string): Promise<TbmConnectionState | null>
  ensureTbmConnectionState(tbmCode: string): Promise<void>
  markOnline(
    tbmCode: string,
    type: ConnectionType,
    lastSeen: string
  ): Promise<void>
  markOffline(
    tbmCode: string,
    type: ConnectionType
  ): Promise<void>
}

export class TbmConnectionRepository {
  async getAll(): Promise<TbmConnectionState[]> {
    console.log("TbmConnectionRepository.getAll() called")
    const { rows } = await pgPool.query<TbmConnectionState>(
      `
      ${BASE_QUERY}
      group by c.tbm_code
    `

    )

    console.log("TbmConnectionRepository.getAll() returned", rows.length, "rows")

    return rows
  }
  async get(tbmCode: string): Promise<TbmConnectionState | null> {
    console.log("TbmConnectionRepository.get() called with", tbmCode)
    const { rows } = await pgPool.query<TbmConnectionState>(
      `
      ${BASE_QUERY}

      where c.tbm_code = $1
      group by c.tbm_code
      `,
      [tbmCode]
    )
    console.log("TbmConnectionRepository.get() returned", rows[0] ?? null)
    return rows[0] ?? null

  }
  async ensureTbmConnectionState(
    tbmCode: string
  ): Promise<void> {
    await pgPool.query(
      `
    insert into runtime.tbm_connection_status
    (
      tbm_code,
      type,
      is_online,
      last_seen_at
    )
    values
      ($1, 'heartbeat', false, null),
      ($1, 'realdata', false, null)

    on conflict (tbm_code, type)
    do nothing
    `,
      [tbmCode]
    )
  }
  async markOnline(
    tbmCode: string,
    type: ConnectionType,
    lastSeen: string
  ): Promise<void> {
    await pgPool.query(
      `
    insert into runtime.tbm_connection_status
    (
      tbm_code,
      type,
      is_online,
      last_seen_at
    )
    values ($1, $2, true, $3)

    on conflict (tbm_code, type)
    do update set
      is_online = true,
      last_seen_at = excluded.last_seen_at
    `,
      [tbmCode, type, lastSeen]
    )
  }
  async markOffline(
    tbmCode: string,
    type: ConnectionType
  ): Promise<void> {
    await pgPool.query(
      `
    update runtime.tbm_connection_status
    set
      is_online = false
    where tbm_code = $1
      and type = $2
    `,
      [tbmCode, type]
    )
  }
}


export const tbmConnectionRepository = new TbmConnectionRepository()
