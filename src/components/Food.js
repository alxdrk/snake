import React, { Component } from "react";
import { connect } from "react-redux";
import { bool, number, array, func, shape } from "prop-types";
import { updatePosition } from "../actions/food";

const getStyles = (x, y, cellSize) => {
  const size = `${cellSize}px`;

  return {
    fontSize: size,
    width: size,
    height: size,
    top: `${y * cellSize}px`,
    left: `${x * cellSize}px`
  };
};

const generateSpawnPosition = size => {
  return Math.floor(Math.random() * size);
};

const isCollide = (snake, food) => {
  return (
    typeof snake.find(({ x, y }) => x === food.x && y === food.y) !==
    "undefined"
  );
};

class Food extends Component {
  static propTypes = {
    currentSnakePosition: array.isRequired,
    updatePosition: func.isRequired,
    field: shape({
      width: number.isRequired,
      height: number.isRequired,
      cellSize: number.isRequired
    }).isRequired,
    allowSpawn: bool
  };

  state = {
    x: 0,
    y: 0
  };

  componentDidMount() {
    this.props.allowSpawn && this.spawn();
  }

  spawn = () => {
    const { field, currentSnakePosition } = this.props;

    const x = generateSpawnPosition(field.width);
    const y = generateSpawnPosition(field.height);

    if (isCollide(currentSnakePosition, { x, y })) {
      this.spawn();
    } else {
      this.setState(
        () => ({ x, y }),
        () => {
          this.props.updatePosition(this.state);
        }
      );
    }
  };

  render() {
    const { x, y } = this.state;
    const { cellSize } = this.props.field;

    return <span className="food" style={getStyles(x, y, cellSize)} />;
  }
}

const mapStateToProps = ({ game, snake }) => ({
  currentSnakePosition: snake.position,
  field: game.settings.field
});

const mapDispatchToProps = dispatch => ({
  updatePosition: position => dispatch(updatePosition(position))
});

export default connect(mapStateToProps, mapDispatchToProps)(Food);
