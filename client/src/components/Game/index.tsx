import React, { useState } from "react";

function Game() {
  const [isGameOver, setIsGameOver] = useState(true);
  const [winner, setWinner] = useState("");
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);

  return <div>Game</div>;
}

export default Game;
