
import type { ConnectionType, TbmConnectionState } from "./types";
import { tbmRealtimeContextStore } from "../realtime-context";
import { tbmConnectionRepository } from "./repository";

// Ensure tbmRealtimeContextStore has a values() method
if (!tbmRealtimeContextStore.values) {
  throw new Error("tbmRealtimeContextStore must have a values() method");
}


const HEARTBEAT_TIMEOUT_MS = 60_000;
const REALDATA_TIMEOUT_MS = 1 * 60_000;

const CONNECTION_TIMEOUTS: Record<ConnectionType, number> = {
  heartbeat: HEARTBEAT_TIMEOUT_MS,
  realdata: REALDATA_TIMEOUT_MS,
};

export async function checkConnectionTimeouts() {
  const now = Date.now();
  for (const [type, timeoutMs] of Object.entries(CONNECTION_TIMEOUTS)) {
    await checkTimeoutByType(type as ConnectionType, timeoutMs, now);
  }
}

async function checkTimeoutByType(
  type: ConnectionType,
  timeoutMs: number,
  now: number
) {
  for (const context of tbmRealtimeContextStore.values()) {
    const state = context.connectionState

    if (!state) {
      continue
    }

    const { isOnline, lastSeen } =
      getConnectionStatus(state, type)

    if (!isOnline || !lastSeen) {
      continue
    }

    const lastSeenMs = Date.parse(lastSeen)

    if (
      Number.isNaN(lastSeenMs) ||
      now - lastSeenMs < timeoutMs
    ) {
      continue
    }

    tbmRealtimeContextStore.updateOffline(
      state.tbmCode,
      type
    )

    void tbmConnectionRepository
      .markOffline(
        state.tbmCode,
        type
      )
      .catch((err) => {
        console.error(
          "Failed to update heartbeat in database",
          {
            tbmCode: state.tbmCode,
            type,
            err,
          }
        )
      })
  }
}


function getConnectionStatus(
  state: TbmConnectionState,
  type: ConnectionType
) {
  if (type === "heartbeat") {
    return {
      isOnline: state.isHeartbeatOnline,
      lastSeen: state.lastHeartbeatAt,
    }
  }

  return {
    isOnline: state.isRealdataOnline,
    lastSeen: state.lastRealdataAt,
  }
}
