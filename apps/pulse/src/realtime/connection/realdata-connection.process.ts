
import { tbmRealtimeContextStore } from "../realtime-context"
import { tbmConnectionRepository } from "../tbm-connection"

export type RealdataConnectionResult = {
    storeUpdated: boolean
    databaseUpdated: boolean
}


export async function processRealdataConnection(
    tbmCode: string,
    recordedAt: string,
): Promise<RealdataConnectionResult> {
    const storeUpdated =
        tbmRealtimeContextStore.updateOnline(
            tbmCode,
            "realdata",
            recordedAt,
        )

    if (!storeUpdated) {
        console.warn(
            "Failed to update realtime connection state",
            {
                tbmCode,
                recordedAt,
            },
        )
    }

    let databaseUpdated = false

    try {
        await tbmConnectionRepository.markOnline(
            tbmCode,
            "realdata",
            recordedAt,
        )

        databaseUpdated = true
    } catch (err) {
        console.error(
            "Failed to update realdata connection in database",
            {
                tbmCode,
                recordedAt,
                err,
            },
        )
    }

    return {
        storeUpdated,
        databaseUpdated,
    }
}