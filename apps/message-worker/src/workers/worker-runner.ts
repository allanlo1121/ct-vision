export type WorkerHandler = () => Promise<void>

export interface WorkerOptions {
  name: string
  intervalMs: number
  handler: WorkerHandler
}

export function startWorker({
  name,
  intervalMs,
  handler,
}: WorkerOptions) {
  let running = false
  let stopped = false
  let timer: NodeJS.Timeout | undefined

  let currentTask: Promise<void> = Promise.resolve()

  async function run() {
    if (running || stopped) return

    running = true

    try {
      await handler()
    } catch (error) {
      console.error(`[${name}] 执行失败`, error)
    } finally {
      running = false
    }
  }

  function tick() {
    if (stopped) return
    currentTask = run()
  }

  tick()

  timer = setInterval(tick, intervalMs)

  console.log(`[${name}] 已启动，间隔 ${intervalMs}ms`)

  return {
    async stop() {
      stopped = true
      if (timer) clearInterval(timer)
      await currentTask
      console.log(`[${name}] 已停止`)
    },
  }
}