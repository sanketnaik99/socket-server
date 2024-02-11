import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const port = process.env.PORT;

io.on("connection", (socket) => {
  socket.emit("hello", {
    message: "hello from server!",
  });
  socket.on("disconnect", (socket) => {
    console.log("user disconnected", socket);
  });

  socket.on("hello", (data) => {
    socket.emit("hello", {
      message: "Broadcasting from server!",
    });
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
