# shadcn/ui monorepo template

This is a Next.js monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```

ct-platform/
│
├─ apps/
│  │
│  ├─ admin/                 # 原 ct-admin
│  │   └─ 组织 / 项目 / 工点 / 隧道 / TBM配置 / 用户权限
│  │
│  ├─ cockpit/               # 原 ct-next
│  │   └─ 大屏 / 实时驾驶舱 / 施工进度 / 报表
│  │
│  ├─ api/                   # Fastify API
│  │   └─ HTTP API / SSE / WebSocket / 内部服务接口
│  │
│  ├─ tbm-worker/            # MQTT 数据采集服务
│  │   └─ MQTT / 心跳 / 实时数据 / 环号 / 阶段 / 入库
│  │
│  └─ auth/                  # 可选：统一登录门户
│      └─ login / logout / callback / app launcher
│
│
├─ packages/
│  │
│  ├─ ui/                    # shadcn 公共组件
│  │
│  ├─ auth/                  # 登录、权限公共逻辑
│  │
│  ├─ supabase/              # Supabase 通用能力
│  │
│  ├─ database/              # generated types / DB公共类型
│  │
│  ├─ domain/                # 领域模型
│  │
│  ├─ contracts/             # API DTO / zod schema
│  │
│  ├─ config/                # 公共配置
│  │
│  ├─ eslint-config/
│  └─ typescript-config/
│
│
├─ infra/
│  │
│  ├─ supabase/
│  │   ├─ migrations/
│  │   ├─ seed.sql
│  │   └─ config.toml
│  │
│  ├─ mqtt/
│  │   └─ emqx/
│  │
│  ├─ docker/
│  │
│  ├─ nginx/
│  │
│  └─ scripts/
│
├─ package.json
├─ pnpm-workspace.yaml
└─ turbo.json