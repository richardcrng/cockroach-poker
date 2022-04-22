import {
  ClientEvent,
  ClientEventListeners,
  ServerEvent,
} from "../../../client/src/types/event.types";
import {
  GameStatus,
} from "../../../client/src/types/game.types";
import { GameManager } from "./manager";

export const kickPlayer: ClientEventListeners[ClientEvent.KICK_PLAYER] = (
  gameId,
  playerIdToKick
) => {
  const gameManager = GameManager.for(gameId);
  gameManager.io.emit(ServerEvent.PLAYER_KICKED, gameId, playerIdToKick);
  gameManager.update((game) => {
    delete game.players[playerIdToKick];
  });
};

export const resetGame: ClientEventListeners[ClientEvent.RESET_GAME] = (
  gameId
) => {
  const gameManager = GameManager.for(gameId);
  gameManager.resetGame();
};

export const startGame: ClientEventListeners[ClientEvent.START_GAME] = (
  gameId: string
): void => {
  const gameManager = GameManager.for(gameId);
  // todo: deal cards out

  gameManager.update((game) => {
    game.status = GameStatus.ONGOING;
  });
};

export const updateGameSettings: ClientEventListeners[ClientEvent.UPDATE_GAME_SETTINGS] =
  (gameId, newSettings) => {
    GameManager.for(gameId).update((game) => ({
      ...game,
      settings: Object.assign(game.settings, newSettings),
    }));
  };
