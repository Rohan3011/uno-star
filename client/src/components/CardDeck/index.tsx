import React from "react";
import { CardType } from "types/card";

export type CardDeckProps = {
  cards: CardType[] | undefined;
  isStacked: boolean;
};

const CardDeck: React.FC<CardDeckProps> = () => {
  return (
    <>
      <p>CardDeck</p>
    </>
  );
};

export default CardDeck;
