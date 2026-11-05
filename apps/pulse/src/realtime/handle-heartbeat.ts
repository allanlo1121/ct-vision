
import { toIsoDateTime } from "../utils/date";
import { tbmRealtimeContextStore } from "./realtime-context";
import { tbmConnectionRepository } from "../realtime/tbm-connection";


export function handleHeartbeat(
    tbmCode: string,
    raw: unknown
): void {
    console.log("Received heartbeat", {
        tbmCode,
        raw,
    })
     const recordedAt = toIsoDateTime(raw)

  if (!recordedAt) {
    console.warn("Invalid heartbeat payload", {
      tbmCode,
      raw,
    })
    return
  }

    const updated =
        tbmRealtimeContextStore.updateOnline(
            tbmCode,
            "heartbeat",
            recordedAt
        )

    if (!updated) {
        return
    }

    void tbmConnectionRepository
        .markOnline(
            tbmCode,
            "heartbeat",
            recordedAt
        )
        .catch((err) => {
            console.error(
                "Failed to update heartbeat in database",
                {
                    tbmCode,
                    raw,
                    err,
                }
            )
        })
}