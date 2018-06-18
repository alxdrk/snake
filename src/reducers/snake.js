import { snakeConstants } from "../constants/snake";

const initialState = {
  position: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case snakeConstants.SET_SNAKE_POSITION:
      return {
        ...state,
        position: action.position
      };
    default:
      return state;
  }
};
