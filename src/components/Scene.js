import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { number, object, string, array, func, shape } from "prop-types";

import { setGameStatus } from "../actions/game";
import { gameConstants } from "../constants/game";
import { keysConstants } from "../constants/keys";

import Field from "./Field";
import Food from "./Food";
import Snake from "./Snake";

import ScoreBoard from "./ScoreBoard";
import GameOver from "./GameOver";
import Congrats from "./Congrats";
import Help from "./Help";

import { getKeyName } from "../utils";

class Scene extends Component {
  static propTypes = {
    history: object.isRequired,
    gameStatus: string.isRequired,
    setGameStatus: func.isRequired,
    snake: array.isRequired,
    field: shape({
      cellSize: number,
      height: number,
      width: number
    })
  };

  state = {
    score: 0
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown, false);
    this.props.setGameStatus(gameConstants.STATUS_PAUSED);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown, false);
    this.props.setGameStatus(gameConstants.STATUS_GAME_OVER);
  }

  handleKeydown = e => {
    const key = getKeyName(e.keyCode);

    if (key === keysConstants.SPACE) {
      this.toggleGameStatus();
    }

    if (key === keysConstants.ESC) {
      this.props.history.push("/");
    }
  };

  handleEat = () => {
    this.setState(
      prevState => ({
        score: prevState.score + 1
      }),
      () => {
        if (!this.existEmptyCell()) {
          this.props.setGameStatus(gameConstants.STATUS_WIN);
        }
      }
    );
  };

  toggleGameStatus = () => {
    const status =
      this.props.gameStatus === gameConstants.STATUS_PLAY
        ? gameConstants.STATUS_PAUSED
        : this.props.gameStatus === gameConstants.STATUS_GAME_OVER
          ? gameConstants.STATUS_PAUSED
          : gameConstants.STATUS_PLAY;

    this.props.setGameStatus(status);
  };

  handleCollide = () => {
    this.props.setGameStatus(gameConstants.STATUS_GAME_OVER);
  };

  retry = () => {
    this.setState(() => ({ score: 0 }));
    this.props.setGameStatus(gameConstants.STATUS_PAUSED);
  };

  existEmptyCell = () => {
    const { snake, field } = this.props;
    const fieldSize = field.width * field.height;
    return snake.length < fieldSize;
  };

  render() {
    const { score } = this.state;
    const { gameStatus } = this.props;

    return (
      <Fragment>
        <ScoreBoard score={score} />
        <div className="scene">
          {gameStatus === gameConstants.STATUS_GAME_OVER && (
            <GameOver onRetry={this.retry} />
          )}

          {gameStatus === gameConstants.STATUS_WIN && (
            <Congrats onRetry={this.retry} />
          )}

          {gameStatus !== gameConstants.STATUS_GAME_OVER &&
            gameStatus !== gameConstants.STATUS_WIN && (
              <Fragment>
                <Field />
                <Snake onEat={this.handleEat} onCollide={this.handleCollide} />
                <Food allowSpawn={this.existEmptyCell()} key={score} />
                <Help />
              </Fragment>
            )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ game, snake }) => ({
  gameStatus: game.status,
  field: game.settings.field,
  snake: snake.position
});

const mapDispatchToProps = dispatch => ({
  setGameStatus: status => dispatch(setGameStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Scene);
