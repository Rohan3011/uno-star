import React, { useEffect, useState } from "react";
import { CARDS } from "@src/data";
import { initGameHelper } from "@src/utils/helper";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { setCardDeck } from "@src/redux/slices/gameSlice";
import { setPlayerCards } from "@src/redux/slices/playerSlice";

function Game() {
  const cardDeck = useAppSelector((state) => state.game.cards);
  const playerCards = useAppSelector((state) => state.player.cards);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const g = initGameHelper(CARDS);
    dispatch(setCardDeck(g.remainingCards));
    dispatch(setPlayerCards(g.playerCards));
  }, []);

  return (
    <div>
      <span>MY Cards</span>
      {playerCards?.map((card, index) => (
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
    </div>
  );
}

export default Game;
