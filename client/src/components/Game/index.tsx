import React, { useEffect, useState } from "react";
import { CARDS } from "@src/data";
import { initGameHelper } from "@src/utils/helper";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { socket } from "@src/Socket";
import { GameState, initGameState } from "@src/redux/slices/gameSlice";

function Game() {
  const game = useAppSelector((state) => state.game);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("game:init", (gameState: GameState) => {
      console.log("Game started");
    });

    socket.on("message:send", (msg) => {
      console.log(msg);
    });

    return () => {
      socket.off("game:init");
      socket.off("message:send");
    };
  }, []);

  const socketInitGame = () => {
    const g = initGameHelper(CARDS);
    dispatch(initGameState(g));
    socket.emit("game:init", game);
  };

  return (
    <div className="nes-container with-title is-centered">
      <p className="title">Uno-star</p>
      <p>Welcome! Wanna Play uno, click the start button</p>
      <div>
        <span>Player 1</span>
        {game.player1Cards?.map((card, index) => (
          <div key={index}>
            <p> {card.name} </p>
            <img
              width={50}
              height={100}
              src={`/images/cards/${card.name}`}
              alt={card.name}
            />
          </div>
        ))}

        <span>Player 2</span>
        {game.player2Cards?.map((card, index) => (
          <div key={index}>
            <p> {card.name} </p>
            <img
              width={50}
              height={100}
              src={`/images/cards/${card.name}`}
              alt={card.name}
            />
          </div>
        ))}
        <button className="nes-btn is-success" onClick={socketInitGame}>
          <span className="">Start</span>
        </button>
      </div>
    </div>
  );
}

export default Game;
