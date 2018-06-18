import { gameConstants } from "../constants/game";

export const setGameStatus = status => ({
  type: gameConstants.SET_STATUS,
  status
});

export const setFieldSettings = settings => ({
  type: gameConstants.SET_SETTINGS,
  settings
});

export const setSnakeSettings = settings => ({
  type: gameConstants.SET_SETTINGS,
  settings
});
