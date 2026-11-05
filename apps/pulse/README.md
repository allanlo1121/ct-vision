pnpm add fastify socket.io mqtt @fastify/cors

apps/realtime/
src/
main.ts

    mqtt/
      mqtt.client.ts

    socket/
      socket.server.ts

    runtime/
      runtime.store.ts
      runtime.types.ts


```bash
pnpm build
pm2 start dist/main.js --name ct-realtime
```