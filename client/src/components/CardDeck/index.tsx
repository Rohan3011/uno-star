import React from "react";
import { Card } from "@src/types/card";

export type CardDeckProps = {
  cards: Card[] | undefined;
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
