import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Game from "./components/Game";

const socket = io("http://localhost:5000/");

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
      <button className="nes-btn is-primary px-6 py-2.5" onClick={sendPing}>
        <span className="font-medium drop-shadow-md"> Send ping </span>
      </button>

      <Game />
    </div>
  );
}

export default App;
