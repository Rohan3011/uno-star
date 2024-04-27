import { socket } from "@src/Socket";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { GameState, startGame } from "@src/redux/slices/gameSlice";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardDeck from "../CardDeck";

function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  // const game = useAppSelector((state) => state.game);

  // const dispatch = useAppDispatch();

  const [game, setGame] = useState<any>();

  useEffect(() => {
    socket.connect();

    socket.on("game:join", (playerName: string) => {
      console.log(`${playerName} has joined!`);
    });

    socket.on("message:error", (msg) => {
      console.log(msg);
    });

    socket.on("game:start", (g: any) => {
      setGame(g);
      // navigate(`/game/${game.roomId}`);
      console.log("Game has started", g);
    });

    return () => {
      socket.off("game:join");
      socket.off("game:start");
      socket.off("message:error");
    };
  }, []);

  const handleStart = () => {
    socket.emit("game:start", gameId);
  };

  const handleJoin = () => {
    socket.emit("game:join", gameId, "xyz");
  };

  console.log("GAME: ", game);

  return (
    <main className="h-screen ">
      <div className=" nes-container with-title is-centered max-w-4xl mx-auto mt-10">
        <h1>
          Lobby {socket.active && <span className="text-red-500">LIVE</span>}
        </h1>
        <h1>Game id : {gameId}</h1>
        <h1>Player id : {socket.id}</h1>
        <h1>Waiting for host to start the game</h1>

        <button
          type="button"
          className="nes-btn is-primary"
          onClick={handleJoin}
        >
          Join
        </button>
        <button
          type="button"
          className="nes-btn is-primary"
          onClick={handleStart}
        >
          Start
        </button>
      </div>
      <CardDeck cards={game?.deck} />
    </main>
  );
}

export default GamePage;
