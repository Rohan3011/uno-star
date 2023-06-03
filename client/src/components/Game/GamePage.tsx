import React, { useEffect, useState } from "react";
import { CARDS } from "@src/data";
import { startGameHelper, makeGameHelper } from "@src/utils/helper";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { socket } from "@src/Socket";
import {
  GameState,
  initGameState,
  startGame,
} from "@src/redux/slices/gameSlice";
import { useNavigate } from "react-router-dom";

function Game() {
  const navigate = useNavigate();
  const game = useAppSelector((state) => state.game);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(game);
  }, [game]);

  useEffect(() => {
    socket.on("game:init", (gameState: GameState) => {
      dispatch(initGameState(gameState));
      console.log(gameState);
      // navigate(`/join/${gameState.roomId}`);
    });

    socket.on("message:send", (msg) => {
      console.log(msg);
    });

    socket.on("game:start", (g: GameState) => {
      dispatch(startGame(g));
      navigate(`game/${game.roomId}`);
    });

    return () => {
      socket.off("game:init");
      socket.off("game:start");
      socket.off("message:send");
    };
  }, []);

  const socketInitGame = () => {
    const _game = makeGameHelper(CARDS);
    dispatch(initGameState(_game));
    socket.emit("game:init", _game);
  };

  return (
    <div className="nes-container with-title is-centered">
      <p className="title">Uno-star</p>
      <p>Welcome! Wanna Play uno, click the start button</p>
      <div>
        <button className="nes-btn is-success" onClick={socketInitGame}>
          <span className="">Start</span>
        </button>
      </div>
    </div>
  );
}

export default Game;
