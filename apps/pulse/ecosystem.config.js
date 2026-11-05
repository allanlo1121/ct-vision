module.exports = {
  apps: [
    {
      name: "ct-realtime",
      cwd: "/opt/chengtong-vision/ct-realtime",

      script: "pnpm",
      args: "start",

      env: {
        NODE_ENV: "production",
      },
    },
  ],
}