import React from "react";
import { Link } from "react-router-dom";
import { func } from "prop-types";

const GameOver = ({ onRetry }) => {
  return (
    <div className="game-over">
      <h2 className="heading">YOU DIED</h2>
      <ul className="game-menu">
        <li>
          <Link to="/game" onClick={onRetry}>
            Retry
          </Link>
        </li>
        <li>
          <Link to="/">Menu</Link>
        </li>
      </ul>
      <audio autoPlay>
        <source src="/media/end.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

GameOver.propTypes = {
  onRetry: func.isRequired
};

export default GameOver;
