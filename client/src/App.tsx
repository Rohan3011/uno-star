import React, { useState, useEffect } from "react";
import Game from "./components/Game";
import { socket } from "@src/Socket";

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

    socket.on("player:status", (data) => {
      console.log(data?.message);
    });
    socket.on("player:info", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("player:status");
      socket.off("player:info");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };

  const setupPlayer = () => {
    socket.emit("player:init", "player1");
  };

  const getPlayerInfo = () => {
    socket.emit("player:info");
  };

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button className="nes-btn is-primary px-6 py-2.5" onClick={sendPing}>
        <span className="font-medium drop-shadow-md"> Send ping </span>
      </button>
      <button className="nes-btn is-primary px-6 py-2.5" onClick={setupPlayer}>
        <span className="font-medium drop-shadow-md"> setup Player </span>
      </button>
      <button
        className="nes-btn is-primary px-6 py-2.5"
        onClick={getPlayerInfo}
      >
        <span className="font-medium drop-shadow-md"> Player Info </span>
      </button>
      <Game />
    </div>
  );
}

export default App;
