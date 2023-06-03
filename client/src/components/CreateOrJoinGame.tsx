import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateOrJoinGame() {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/game/${gameId}`);
  };

  const createGame = () => {
    navigate(`/game`);
  };

  return (
    <div className="nes-container with-title is-centered">
      <p className="title">Uno-star</p>
      <p>Welcome! Wanna Play uno, click the start button</p>
      <div>
        <button className="nes-btn is-success" onClick={createGame}>
          Create
        </button>
      </div>
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

export default CreateOrJoinGame;
