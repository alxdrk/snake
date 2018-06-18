import { foodConstants } from "../constants/food";

export const updatePosition = position => ({
  type: foodConstants.SET_FOOD_POSITION,
  position
});
