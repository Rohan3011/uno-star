import { Card } from "@src/types/card";
import React from "react";

export type CardDeckProps = {
  cards: Card[] | undefined;
  isStacked?: boolean;
};

const CardDeck: React.FC<CardDeckProps> = ({ cards }) => {
  return (
    <div className="">
      {cards?.map((card, i) => (
        <div key={i}>
          <img src={`/images/cards/${card.color}_${card.value}.png`} alt={`${card.color}_${card.value}`} />
        </div>
      ))}
    </div>
  );
};

export default CardDeck;
