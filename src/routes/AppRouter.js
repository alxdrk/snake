import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import HomePage from "../pages/HomePage";
import GamePage from "../pages/GamePage";
import SettingsPage from "../pages/SettingsPage";
import LeaderBoardPage from "../pages/LeaderBoardPage";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div id="game">
      <Switch>
        <Route component={HomePage} path="/" exact />
        <Route component={GamePage} path="/game" />
        <Route component={SettingsPage} path="/settings" />
        <Route component={LeaderBoardPage} path="/leaderboards" />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
