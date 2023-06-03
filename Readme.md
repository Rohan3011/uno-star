## How to Play?

```
Total Cards : 108

Colors : Red, Blue, Green, Yellow

Each Color has: 25 cards => 25 * 4 = 100 cards
    one number card = 1 card
    [one to nine]  number card = 18 cards
    skip card = 2 Cards
    reverse card = 2 Cards
    draw2 card = 2 Cards

 Wild Cards = 4

 Draw4 cards = 4

```

UNO is a card game that is played with a specially printed deck of 108 cards. The aim of the game is to be the first player with no cards left in your hand. You can play UNO online with your friends or against the computer.

The game has four colors: red, yellow, green and blue.

Each color has 19 number cards from 0 to 9 and two of each action card: skip, reverse and draw two. There are also eight wild cards: four wilds that let you choose any color to play next, and four wild draw fours that let you choose any color and make the next player draw four cards.

You start the game by drawing seven cards each and placing one card face up on the table. This is the discard pile. The remaining cards form the draw pile. The player who has the card with number 7 in their hand starts first1. On your turn, you have to play a card that matches either the color or the number of the top card on the discard pile. If you don’t have a matching card, you have to draw one from the draw pile until you get one or pass your turn.

If you play an action card, you can affect the game in different ways. A skip card makes the next player miss their turn. A reverse card changes the direction of play. A draw two card makes the next player draw two cards and miss their turn. A wild card lets you choose any color to play next. A wild draw four card lets you choose any color and make the next player draw four cards and miss their turn1.

When you have only one card left in your hand, you have to say “UNO” before playing it. If another player catches you not saying “UNO”, they can challenge you and make you draw two penalty cards1. The first player who plays all their cards wins the game.

I hope this explanation helps you understand how to play UNO game.

## Control Flow

visit the site -> create a game -> click start -> game begins
-> join a game -> wait for game to begin -> game begins

## Project Structure

```md
- server/

  - src/
    - controllers/
      - gameController.js
      - playerController.js
    - models/
      - gameModel.js
      - playerModel.js
    - routes/
      - gameRoutes.js
      - playerRoutes.js
    - services/
      - gameService.js
      - playerService.js
    - utils/
      - websocketUtil.js
    - app.js
    - server.js

- client/
  - public/
    - index.html
  - src/
    - components/
      - GameBoard.js
      - PlayerHand.js
      - ...
    - services/
      - apiService.js
      - websocketService.js
    - App.js
    - index.js
```
