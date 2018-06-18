import React from "react";
import { number } from "prop-types";

const ScoreBoard = ({ score }) => (
  <div className="score-board">Score: {score}</div>
);

ScoreBoard.propTypes = {
  score: number.isRequired
};

export default ScoreBoard;
