import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { isNumeric } from "validator";

import { setGameSettings } from "../actions/game";

class Settings extends Component {
  constructor(props) {
    super(props);

    const { snake, field } = props;

    this.state = {
      snake,
      field,
      errors: {}
    };
  }

  handleSnakeSettingsChange = ({ target }) => {
    const value = target.value || 0;

    if (!value || isNumeric(value)) {
      this.setState(prevState => ({
        snake: {
          ...prevState.snake,
          [target.name]: parseInt(value, 10)
        }
      }));
    }
  };

  handleFieldSettingsChange = ({ target }) => {
    const value = target.value || 0;

    if (!value || isNumeric(value)) {
      this.setState(prevState => ({
        field: {
          ...prevState.field,
          [target.name]: parseInt(value, 10)
        }
      }));
    }
  };

  applySettings = e => {
    e.preventDefault();

    const errors = this.validateFieldSettings();

    if (Object.keys(errors).length === 0) {
      const { field, snake } = this.state;
      this.props.setGameSettings({ field, snake });
      this.props.history.push("/");
    } else {
      this.setState(() => ({ errors }));
    }
  };

  validateFieldSettings = () => {
    const { snake, field } = this.state;
    const errors = {};

    if (snake.startLength <= 0) {
      errors.startLength = "Snake length must be greater than 0";
    }

    if (snake.startLength >= field.width) {
      errors.startLength = `Snake length must be less than ${field.width}`;
    }

    if (field.width <= 1) {
      errors.width = "Width must be greater than 1";
    }

    if (field.height <= 1) {
      errors.height = "Height must be greater than 1";
    }

    if (field.cellSize === 0) {
      errors.cellSize = "Cell size must be greater than 0";
    }

    return errors;
  };

  renderSpeedValue = speed => {
    return speed / 100;
  };

  render() {
    const { snake, field, errors } = this.state;

    return (
      <Fragment>
        <form className="settings-form" autoComplete="off">
          <fieldset>
            <legend>Snake</legend>

            <div className="form-group">
              <label>Speed</label>
              <div>
                <input
                  name="speed"
                  type="range"
                  min="100"
                  max="1000"
                  step="100"
                  value={snake.speed}
                  onChange={this.handleSnakeSettingsChange}
                />
                <span className="settings-speed-value">
                  {this.renderSpeedValue(snake.speed)}
                </span>
              </div>
            </div>
            <div className="form-group">
              <label>Size</label>
              <input
                className="form-control"
                type="text"
                name="startLength"
                value={snake.startLength}
                maxLength="3"
                onChange={this.handleSnakeSettingsChange}
              />
            </div>
            {errors.startLength && (
              <span className="error-message">{errors.startLength}</span>
            )}
          </fieldset>
          <fieldset>
            <legend>Field</legend>
            <div className="form-group">
              <label>Width</label>
              <input
                className="form-control"
                type="text"
                name="width"
                value={field.width}
                maxLength="3"
                onChange={this.handleFieldSettingsChange}
              />
            </div>
            {errors.width && (
              <span className="error-message">{errors.width}</span>
            )}
            <div className="form-group">
              <label>Height</label>{" "}
              <input
                className="form-control"
                type="text"
                name="height"
                value={field.height}
                maxLength="2"
                onChange={this.handleFieldSettingsChange}
              />
            </div>
            {errors.height && (
              <span className="error-message">{errors.height}</span>
            )}
            <div className="form-group">
              <label>Cell size</label>{" "}
              <input
                className="form-control"
                type="text"
                name="cellSize"
                value={field.cellSize}
                maxLength="2"
                onChange={this.handleFieldSettingsChange}
              />
            </div>

            {errors.cellSize && (
              <span className="error-message">{errors.cellSize}</span>
            )}
          </fieldset>
        </form>

        <ul className="game-menu">
          <li>
            <a href="#" onClick={this.applySettings}>
              Back
            </a>
          </li>
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  snake: game.settings.snake,
  field: game.settings.field
});

const mapDispatchToProps = dispatch => ({
  setGameSettings: settings => dispatch(setGameSettings(settings))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
