import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const corsConfig = cors();

const io = new Server(httpServer, {
  cors: {
    origin: "https://socket-test-kohl.vercel.app",
  },
});
const port = process.env.PORT;

io.on("connection", (socket) => {
  socket.emit("hello", {
    message: "hello from server!",
  });

  socket.on("disconnect", (socket) => {
    console.info("user disconnected", socket);
  });

  socket.on("hello", (data) => {
    socket.broadcast.emit("hello", {
      message: "Broadcasting from server!",
    });
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(corsConfig);
httpServer.listen(port, () => {
  console.info(`[server]: Server is running at http://localhost:${port}`);
});
