export type CardColor = "red" | "green" | "blue" | "yellow";
export type CardValueType =
  | "draw-two"
  | "reverse"
  | "skip"
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

// export type Card = {
//   name: CardImage;
//   color: CardColor;
//   CardType?: CardValueType;
//   isWildCard?: boolean;
//   url?: string;
// };

export interface Card {
  /**
   * The color of the card.
   */
  color: string;

  /**
   * The value or special action of the card.
   */
  value: string;
}
