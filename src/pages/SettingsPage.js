import React from "react";
import Settings from "../components/Settings";

const SettingsPage = ({ history }) => (
  <div className="game-settings">
    <h2 className="heading">Settings</h2>
    <Settings history={history} />
  </div>
);

export default SettingsPage;
