import { Server } from "socket.io";

export let io: Server;

export function createSocketServer(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("client connected");

    socket.on("subscribe:tbm", (tbmCode: string) => {
      socket.join(`tbm:${tbmCode}`);

      console.log(`subscribe tbm:${tbmCode}`);
    });

    socket.on("unsubscribe:tbm", (tbmCode: string) => {
      socket.leave(`tbm:${tbmCode}`);
    });
  });
}
