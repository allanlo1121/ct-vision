import mqtt, { type MqttClient } from "mqtt"
import { promisify } from "node:util"
import os from "node:os"
import { handleRealdata } from "../ingestion/hendle-realdata"
import { mapRealdata } from "../ingestion/mappers/realdata.mapper"
import { handleHeartbeat } from "../ingestion/handle-heartbeat"
import { processRealdata } from "../processing/process-realdata"

let client: MqttClient | null = null

export async function startMqtt(): Promise<void> {
  if (client) return

  const mqttClient = mqtt.connect(process.env.MQTT_URL!, {
    clientId: `pulse-${os.hostname()}-${process.pid}`,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clean: true,
    reconnectPeriod: 5000,
    connectTimeout: 30_000,
    keepalive: 60,
  })

  client = mqttClient

  mqttClient.on("connect", () => {
    console.log("[MQTT] Connected")

    mqttClient.subscribe(
      [
        "chengtong/+/up/realdata",
        "chengtong/+/up/heartbeat",
      ],
      (error) => {
        if (error) {
          console.error("[MQTT] Subscribe failed", error)
        }
      }
    )
  })

  mqttClient.on("message", (topic, payload) => {
    void dispatchMqttMessage(topic, payload).catch((error) => {
      console.error("[MQTT] Message handling failed", {
        topic,
        error,
      })
    })
  })

  mqttClient.on("error", (error) => {
    console.error("[MQTT] Error", error)
  })
}

export async function stopMqtt(): Promise<void> {
  if (!client) return

  const mqttClient = client
  client = null

  await mqttClient.endAsync()

  console.log("[MQTT] Stopped")
}

async function dispatchMqttMessage(
  topic: string,
  payload: Buffer
): Promise<void> {
  // console.log("Dispatching MQTT message", { topic })
  const parts = topic.split("/")

  if (parts.length !== 4 || parts[0] !== "chengtong" || parts[2] !== "up") {
    console.warn("Invalid MQTT topic", { topic })
    return
  }

  const tbmCode = parts[1]
  const messageType = parts[3]

  // const context = tbmRealtimeContextStore.get(tbmCode)

  // if (!context) {
  //   console.warn("MQTT message from inactive TBM", {
  //     tbmCode,
  //     topic,
  //   })
  //   return
  // }

  let raw: unknown

  try {
    raw = JSON.parse(payload.toString())
  } catch (error) {
    console.error("Invalid MQTT JSON", {
      tbmCode,
      topic,
      error,
    })
    return
  }

  switch (messageType) {
    case "realdata":
      console.log(
        `[MQTT] ${new Date().toLocaleString("zh-CN", {
          timeZone: "Asia/Shanghai",
          hour12: false,
        })} | topic: ${topic}`
      )
      const data = mapRealdata(raw)

      // 原始数据存储
      void handleRealdata(tbmCode, data).catch((error) => {
        console.error("Realdata ingestion failed", {
          tbmCode,
          error,
        })
      })

      // 业务计算
      void processRealdata(tbmCode, data).catch((error) => {
        console.error("Realdata processing failed", {
          tbmCode,
          error,
        })
      })

      break

    case "heartbeat":
      await handleHeartbeat(tbmCode, raw)
      break

    default:
      console.warn("Unsupported MQTT message type", {
        topic,
        messageType,
      })
  }
}
