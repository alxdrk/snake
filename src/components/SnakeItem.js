import React from "react";
import { number, bool } from "prop-types";

const SnakeItem = ({ x, y, inStomach, size }) => (
  <div
    className={inStomach ? "snake-item in-stomach" : "snake-item"}
    style={{
      top: `${y * size}px`,
      left: `${x * size}px`,
      width: `${size}px`,
      height: `${size}px`
    }}
  />
);

SnakeItem.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  size: number.isRequired,
  inStomach: bool
};

export default SnakeItem;
