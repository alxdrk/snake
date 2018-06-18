import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getKeyName, allowedDirections } from "../utils";

class Menu extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown, false);
  }

  handleKeydown = e => {
    const key = getKeyName(e.keyCode);

    if (allowedDirections.includes(key)) {
      // TODO: Arrow navigation
      e.preventDefault();
    }
  };

  render() {
    return (
      <ul className="game-menu">
        <li>
          <NavLink to="/game" tabIndex="1">
            Start
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" tabIndex="3">
            Settings
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default Menu;
