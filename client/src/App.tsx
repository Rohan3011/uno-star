import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000/socket-global");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState<string>("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      console.log("Pong");
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button
        className="px-6 py-2.5 m-4 bg-blue-500 rounded shadow text-white active:scale-95 transition-transform"
        onClick={sendPing}
      >
        <span className="font-medium drop-shadow-md"> Send ping </span>
      </button>
    </div>
  );
}

export default App;
