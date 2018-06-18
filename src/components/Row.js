import React from "react";
import { number } from "prop-types";
import Cell from "./Cell";

const Row = ({ width, cellSize }) => (
  <div className="row">
    {Array.from(Array(width)).map((val, pos) => (
      <Cell key={pos} size={cellSize} />
    ))}
  </div>
);

Row.propTypes = {
  width: number.isRequired,
  cellSize: number.isRequired
};

export default Row;
