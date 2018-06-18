import { gameConstants } from "../constants/game";

export const setGameStatus = status => ({
  type: gameConstants.SET_STATUS,
  status
});

export const setGameSettings = settings => ({
  type: gameConstants.SET_SETTINGS,
  settings
});
