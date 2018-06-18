import { snakeConstants } from "../constants/snake";

export const updatePosition = position => ({
  type: snakeConstants.SET_SNAKE_POSITION,
  position
});
