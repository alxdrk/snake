import React from "react";
import { connect } from "react-redux";
import { number, shape } from "prop-types";
import Row from "./Row";

const getInitialFieldSize = (width, height, cellSize) => {
  return {
    width: `${width * cellSize}px`,
    height: `${height * cellSize}px`
  };
};

const renderRows = (width, height, cellSize) => {
  return Array.from(Array(height)).map((val, pos) => (
    <Row key={pos} width={width} cellSize={cellSize} />
  ));
};

const Field = ({ field }) => (
  <div
    className="field"
    style={getInitialFieldSize(field.width, field.height, field.cellSize)}
  >
    {renderRows(field.width, field.height, field.cellSize)}
  </div>
);

Field.propTypes = {
  field: shape({
    cellSize: number,
    height: number,
    width: number
  })
};

const mapStateToProps = ({ game }) => ({
  field: game.settings.field
});

export default connect(mapStateToProps)(Field);
