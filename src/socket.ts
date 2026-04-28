import { io, Socket } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

let socket: Socket | null = null;

export const initSocket = (userId: string): Socket => {
  if (socket?.connected) return socket;

  socket = io(BASE_URL, {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("Socket connected ✅");
    socket?.emit("user:online", userId);
    socket?.emit("user:join", userId);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};