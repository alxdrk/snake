import { gameConstants } from "../constants/game";
import { keysConstants } from "../constants/keys";

const initialState = {
  settings: {
    snake: {
      speed: 700,
      startX: 0,
      startY: 0,
      startLength: 3,
      startDirection: keysConstants.RIGHT
    },
    field: {
      width: 16,
      height: 12,
      cellSize: 40
    }
  },
  status: gameConstants.STATUS_PAUSED
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case gameConstants.SET_STATUS:
      return {
        ...state,
        status: action.status
      };
    case gameConstants.SET_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.settings
        }
      };
    default:
      return state;
  }
};
