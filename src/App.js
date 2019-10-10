import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Player from "./Player";
import Admin from "./Admin";
import "./App.css";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Player />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route>
            <p>404</p>
          </Route>
        </Switch>
      </Router>
    );
  }
}
