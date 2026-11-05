
export type ConnectionType = "heartbeat" | "realdata";


export type TbmConnectionState = {
    tbmCode: string
    isHeartbeatOnline: boolean
    isRealdataOnline: boolean
    lastHeartbeatAt: string | null
    lastRealdataAt: string | null
}