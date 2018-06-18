import { foodConstants } from "../constants/food";

const initialState = {
  position: { x: 0, y: 0 }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case foodConstants.SET_FOOD_POSITION:
      return {
        ...state,
        position: action.position
      };
    default:
      return state;
  }
};
