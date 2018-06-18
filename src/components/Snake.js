import React, { Component } from "react";
import { connect } from "react-redux";
import { number, string, shape, func } from "prop-types";

import SnakeItem from "./SnakeItem";

import { keysConstants } from "../constants/keys";
import { gameConstants } from "../constants/game";
import { updatePosition } from "../actions/snake";
import { getKeyName, isSamePlane, allowedDirections } from "../utils";

const getInitialBody = (length, x, y, direction) => {
  return Array.from(Array(length)).map(() => ({ x: x++, y: y, direction }));
};

const isEaten = (food, head) => {
  return food.x === head.x && food.y === head.y;
};

class Snake extends Component {
  static propTypes = {
    status: string.isRequired,
    updatePosition: func.isRequired,
    onEat: func.isRequired,
    onCollide: func.isRequired,
    foodPosition: shape({
      x: number.isRequired,
      y: number.isRequired
    }).isRequired,
    field: shape({
      cellSize: number,
      height: number,
      width: number
    }),
    settings: shape({
      startLength: number.isRequired,
      startX: number.isRequired,
      startY: number.isRequired,
      startDirection: string.isRequired,
      speed: number.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);

    const { startLength, startX, startY, startDirection } = props.settings;
    const body = getInitialBody(startLength, startX, startY, startDirection);

    this.state = {
      body,
      direction: startDirection
    };

    props.updatePosition(body);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown, false);
    this.move();
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown, false);
  }

  handleKeydown = e => {
    const direction = getKeyName(e.keyCode);

    if (allowedDirections.includes(direction)) {
      this.changeDirection(direction);
      e.preventDefault();
    }
  };

  getNewPosition = body => {
    return body.map((item, i) => {
      if (item.inStomach) {
        if (item.x === body[i + 1].x && item.y === body[i + 1].y) {
          return {
            ...item,
            inStomach: false
          };
        }

        return item;
      }

      switch (item.direction) {
        case keysConstants.LEFT:
          return {
            ...item,
            x: item.x - 1
          };
        case keysConstants.RIGHT:
          return {
            ...item,
            x: item.x + 1
          };
        case keysConstants.UP:
          return {
            ...item,
            y: item.y - 1
          };
        case keysConstants.DOWN:
          return {
            ...item,
            y: item.y + 1
          };
      }
    });
  };

  getNewDirection = (body = []) => {
    for (let i = 0, len = body.length - 1; i < len; i++) {
      body[i].direction = body[i + 1].direction;
    }

    return body;
  };

  computeNewParams = (body = []) => {
    const newBody = this.getNewDirection(this.getNewPosition(body));
    const { foodPosition: food } = this.props;
    const head = body[body.length - 1];

    if (isEaten(food, head)) {
      const newItem = { ...food, inStomach: true };
      this.props.onEat();

      return [newItem, ...newBody];
    }

    return newBody;
  };

  getSnakeHead = () => this.state.body[this.state.body.length - 1];

  move = () => {
    if (this.collisionDetection()) {
      return this.props.onCollide();
    }

    if (this.props.status !== gameConstants.STATUS_GAME_OVER) {
      this.step();
      setTimeout(this.move, 1100 - this.props.settings.speed);
    }
  };

  step = () => {
    if (this.props.status === gameConstants.STATUS_PAUSED) return;

    this.setState(
      prevState => ({ body: this.computeNewParams(prevState.body) }),
      () => {
        this.props.updatePosition(this.state.body);
      }
    );
  };

  changeDirection = direction => {
    if (
      isSamePlane(this.state.direction, direction) ||
      this.props.status !== gameConstants.STATUS_PLAY
    )
      return;

    const head = this.getSnakeHead();
    head.direction = direction;

    this.setState(prevState => ({
      body: [...prevState.body.slice(0, -1), head],
      direction
    }));
  };

  collisionDetection = () => {
    const { field } = this.props;
    const { body } = this.state;
    const head = this.getSnakeHead();

    if (head.x === field.width || head.y === field.height) {
      return true;
    }

    if (head.x < 0 || head.y < 0) {
      return true;
    }

    for (let i = 0, len = body.length - 1; i < len; i++) {
      const item = body[i];

      if (head.x === item.x && head.y === item.y && !item.inStomach) {
        return true;
      }
    }

    return false;
  };

  render() {
    return (
      <div className="snake">
        {this.state.body.map((item, i) => (
          <SnakeItem key={i} size={this.props.field.cellSize} {...item} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ game, food }) => ({
  status: game.status,
  settings: game.settings.snake,
  field: game.settings.field,
  foodPosition: food.position
});

const mapDispatchToProps = dispatch => ({
  updatePosition: position => dispatch(updatePosition(position))
});

export default connect(mapStateToProps, mapDispatchToProps)(Snake);
