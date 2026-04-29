import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Socket } from "socket.io-client";
import { initSocket, disconnectSocket } from "../socket";
import { useAuth } from "./AuthContext";

interface SocketContextType {
  socket: Socket | null;
  onlineCount: number;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineCount: 0,
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineCount, setOnlineCount] = useState(0);

  // Handle socket disconnection when user logs out
  useEffect(() => {
    if (!user?._id) {
      disconnectSocket();
      setSocket(null);
    }
  }, [user?._id]);

  // Handle socket connection and events when user is logged in
  useEffect(() => {
  if (!user?._id) return;

  const s = initSocket(user._id);
  setSocket(s);

  const handleOnlineCount = (count: number) => {
    setOnlineCount(count);
  };

  s.on("users:online-count", handleOnlineCount);

  return () => {
    s.off("users:online-count", handleOnlineCount); // remove listener only
  };
}, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket, onlineCount }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);