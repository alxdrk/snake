import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setFieldSettings, setSnakeSettings } from "../actions/game";

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

  handleSnakeSpeedChange = ({ target }) => {
    const value = parseInt(target.value, 10);

    this.setState(
      prevState => ({
        snake: {
          ...prevState.snake,
          [target.name]: value
        }
      }),
      () => {
        const { snake: settings } = this.state;
        this.props.setFieldSettings({ snake: settings });
      }
    );
  };

  handleFieldSettingsChange = ({ target }) => {
    const value = target.value || 0;

    if (!value || value.match(/^\d+$/)) {
      const errors = this.validateFieldSettings(target.name, value);

      if (errors.length > 0) {
        const msg = errors.join("\r\n");
        alert(msg);
      } else {
        this.setState(
          prevState => ({
            field: {
              ...prevState.field,
              [target.name]: parseInt(value, 10)
            }
          }),
          () => {
            const { field: settings } = this.state;
            this.props.setFieldSettings({ field: settings });
          }
        );
      }
    }
  };

  validateFieldSettings = (name, value) => {
    const { snake } = this.props;
    const errors = [];

    if (name === "width" && value <= snake.startLength) {
      errors.push(`Width must be greater than ${snake.startLength}`);
    }

    if (name === "height" && value <= 1) {
      errors.push("Height must be greater than 1");
    }

    if (name === "cellSize" && value < 1) {
      errors.push("Cell size must be greater than 0");
    }

    return errors;
  };

  renderSpeedValue = speed => {
    return speed / 100;
  };

  render() {
    const { snake, field } = this.state;

    return (
      <Fragment>
        <form className="settings-form" autoComplete="off">
          <fieldset>
            <legend>Snake</legend>

            <div class="form-group">
              <label>Speed</label>
              <div>
                <input
                  name="speed"
                  type="range"
                  min="100"
                  max="1000"
                  step="100"
                  value={snake.speed}
                  onChange={this.handleSnakeSpeedChange}
                />
                <span className="settings-speed-value">
                  {this.renderSpeedValue(snake.speed)}
                </span>
              </div>
              {/* TODO: ADD SNAKE SIZE SETTINGS */}
            </div>
          </fieldset>
          <fieldset>
            <legend>Field</legend>
            <div class="form-group">
              <label>Width</label>
              <input
                type="text"
                name="width"
                value={field.width}
                maxLength="3"
                onChange={this.handleFieldSettingsChange}
              />
            </div>
            <div class="form-group">
              <label>Height</label>{" "}
              <input
                type="text"
                name="height"
                value={field.height}
                maxLength="2"
                onChange={this.handleFieldSettingsChange}
              />
            </div>
            <div class="form-group">
              <label>Cell size</label>{" "}
              <input
                type="text"
                name="cellSize"
                value={field.cellSize}
                maxLength="2"
                onChange={this.handleFieldSettingsChange}
              />
            </div>
          </fieldset>
        </form>

        <ul className="game-menu">
          <li>
            <Link to="/">Back</Link>
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
  setFieldSettings: settings => dispatch(setFieldSettings(settings)),
  setSnakeSettings: settings => dispatch(setSnakeSettings(settings))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
