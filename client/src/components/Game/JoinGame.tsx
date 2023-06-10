import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { startGame } from "@src/redux/slices/gameSlice";
import { socket } from "@src/Socket";
import { startGameHelper } from "@src/utils/helper";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

function JoinGame() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState("");

  async function joinGame(playerName: string = "padladso") {
    const response = await fetch(`/api/games/${gameId}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: playerName }),
    });

    const data = await response.json();

    const playerId: string = data.playerId;
    window.location.href = `/lobby?gameId=${gameId}&playerId=${playerId}`;
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/game/${gameId}`);
  };

  return (
    <div>
      <h1>Game id : {gameId}</h1>
      <h1>Player id : {socket.id}</h1>
      <h1>Waiting for host to start the game</h1>

      <form onSubmit={handleSubmit}>
        <div className="nes-field">
          <label htmlFor="name_field">Game Code</label>
          <input
            type="text"
            id="name_field"
            className="nes-input"
            onChange={handleInput}
          />
        </div>
        <button type="submit" className="nes-btn is-primary">
          Join
        </button>
      </form>
    </div>
  );
}

export default JoinGame;
