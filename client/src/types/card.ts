export type CardColor = "Red" | "Green" | "Blue" | "Yellow";
export type CardValueType =
  | "Draw"
  | "Reverse"
  | "Skip"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

export type CardImage = `${CardColor}_${CardValueType}.png`;

export type Card = {
  name: CardImage;
  color: CardColor;
  CardType?: CardValueType;
  isWildCard?: boolean;
  url?: string;
};
