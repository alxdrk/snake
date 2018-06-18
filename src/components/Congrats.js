import React from "react";
import { Link } from "react-router-dom";
import { func } from "prop-types";

const Congrats = ({ onRetry }) => {
  return (
    <div className="congrats">
      <h2 className="heading">YOU WIN!</h2>
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
    </div>
  );
};

Congrats.propTypes = {
  onRetry: func.isRequired
};

export default Congrats;
