import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateOrJoinGame() {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _gameId = e.target.value;
    setGameId(_gameId.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/game/${gameId}`);
  };

  async function createGame() {
    const response = await fetch("http://localhost:5000/api/games", {
      method: "POST",
    });
    const data = await response.json();

    const _gameId: string = data.gameId;

    // Process the game ID and navigate to the game lobby or wait for other players
    // Example: redirect to the lobby page with the game ID in the URL
    navigate(`game/${_gameId}`);
    console.log(data);
  }

  function handleJoin() {
    navigate(`game/${gameId}`);
  }

  return (
    <div className="nes-container with-title is-centered">
      <p className="title">Uno-star</p>
      <p>Welcome! Wanna Play uno, click the start button</p>
      <div>
        <button className="nes-btn is-success" onClick={createGame}>
          Create
        </button>
      </div>

      <br />
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
        <button
          type="submit"
          className="nes-btn is-primary"
          onClick={handleJoin}
        >
          Join
        </button>
      </form>
    </div>
  );
}

export default CreateOrJoinGame;
