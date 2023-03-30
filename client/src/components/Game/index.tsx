import React, { useEffect, useState } from "react";
import { CARDS } from "@src/data";
import { initGameHelper } from "@src/utils/helper";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { socket } from "@src/Socket";
import { initGameState } from "@src/redux/slices/gameSlice";

function Game() {
  const game = useAppSelector((state) => state.game);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const g = initGameHelper(CARDS);
    dispatch(initGameState(g));

    socket.emit("game:init", g);

    return () => {
      socket.off("game:init");
    };
  }, []);
  return (
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
    </div>
  );
}

export default Game;
