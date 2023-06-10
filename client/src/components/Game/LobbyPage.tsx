import { socket } from "@src/Socket";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { GameState, startGame } from "@src/redux/slices/gameSlice";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function LobbyPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const game = useAppSelector((state) => state.game);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.emit("game:join", gameId, "xyz");
  }, []);

  useEffect(() => {
    socket.on("game:join", (playerName: string) => {
      console.log(`${playerName} has joined!`);
    });

    socket.on("message:error", (msg) => {
      console.log(msg);
    });

    socket.on("game:start", (g: GameState) => {
      //   dispatch(startGame(g));
      navigate(`game/${game.roomId}`);
      console.log("Game has started");
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

  return (
    <div className="nes-container with-title is-centered max-w-4xl mx-auto mt-10">
      <h1>Lobby</h1>
      <h1>Game id : {gameId}</h1>
      <h1>Player id : {socket.id}</h1>
      <h1>Waiting for host to start the game</h1>
      <button type="button" className="nes-btn is-primary" onClick={handleJoin}>
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
  );
}

export default LobbyPage;
