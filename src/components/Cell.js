import React from "react";
import { number } from "prop-types";

const Cell = ({ size }) => (
  <div className="cell" style={{ width: `${size}px`, height: `${size}px` }} />
);

Cell.propTypes = {
  size: number.isRequired
};

export default Cell;
