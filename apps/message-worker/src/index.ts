import { env } from "./config/env"
import { startWorker } from "./workers/worker-runner"
import { processNotificationEvents } from "./workers/notification-event.worker"
import { processNotificationOutbox } from "./workers/notification-delivery.worker"

async function main() {
    console.log("Notification Worker starting...")

    const eventWorker = startWorker({
        name: "NotificationEventWorker",
        intervalMs: env.NOTIFICATION_EVENT_POLL_MS,
        handler: processNotificationEvents,
    })

    const deliveryWorker = startWorker({
        name: "NotificationDeliveryWorker",
        intervalMs: env.NOTIFICATION_DELIVERY_POLL_MS,
        handler: processNotificationOutbox,
    })

    let shuttingDown = false

    async function shutdown(signal: string) {
        if (shuttingDown) return

        shuttingDown = true
        console.log(`Received ${signal}, shutting down...`)

        await Promise.all([
            eventWorker.stop(),
            deliveryWorker.stop(),
        ])
    }

    process.once("SIGINT", () => {
        void shutdown("SIGINT")
    })

    process.once("SIGTERM", () => {
        void shutdown("SIGTERM")
    })
}

main().catch(error => {
    console.error("Notification Worker startup failed", error)
    process.exitCode = 1
})