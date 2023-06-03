import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { startGame } from "@src/redux/slices/gameSlice";
import { socket } from "@src/Socket";
import { startGameHelper } from "@src/utils/helper";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function JoinGame() {
  const { gameId } = useParams();
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const [players, setPlayers] = useState();

  useEffect(() => {
    socket.emit("game:join", gameId);
    socket.on("game:join", (g) => {
      console.log(g);
    });
  }, []);

  useEffect(() => console.log(players), [players]);

  const socketStartGame = () => {
    const _game = startGameHelper(game);
    dispatch(startGame(_game));
  };

  return (
    <div>
      <h1>Game id : {gameId}</h1>
      <h1>Player id : {socket.id}</h1>
      <h1>Waiting for host to start the game</h1>
    </div>
  );
}

async function createGame(): Promise<void> {
  const response = await fetch("/api/games", { method: "POST" });
  const data = await response.json();

  const gameId: string = data.gameId;

  // Process the game ID and navigate to the game lobby or wait for other players
  // Example: redirect to the lobby page with the game ID in the URL
  window.location.href = `/lobby?gameId=${gameId}`;
}

async function joinGame(gameId: string, playerName: string): Promise<void> {
  const response = await fetch(`/api/games/${gameId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: playerName }),
  });

  const data = await response.json();

  const playerId: string = data.playerId;

  // Process the player ID and navigate to the game lobby or wait for the game to start
  // Example: redirect to the lobby page with the game ID and player ID in the URL
  window.location.href = `/lobby?gameId=${gameId}&playerId=${playerId}`;
}

export default JoinGame;
