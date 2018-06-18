import { keysConstants } from "./constants/keys";

const horizontal = [keysConstants.LEFT, keysConstants.RIGHT];
const vertical = [keysConstants.UP, keysConstants.DOWN];

export const allowedDirections = [
  keysConstants.LEFT,
  keysConstants.RIGHT,
  keysConstants.UP,
  keysConstants.DOWN
];

export const isSamePlane = (prevDir, nextDir) => {
  return (
    (horizontal.indexOf(prevDir) > -1 && horizontal.indexOf(nextDir) > -1) ||
    (vertical.indexOf(prevDir) > -1 && vertical.indexOf(nextDir) > -1)
  );
};

export const getKeyName = keyCode => {
  switch (keyCode) {
    case 27:
      return keysConstants.ESC;
    case 32:
      return keysConstants.SPACE;
    case 37:
    case 65:
      return keysConstants.LEFT;
    case 38:
    case 87:
      return keysConstants.UP;
    case 39:
    case 68:
      return keysConstants.RIGHT;
    case 40:
    case 83:
      return keysConstants.DOWN;
    default:
      return keyCode;
  }
};
