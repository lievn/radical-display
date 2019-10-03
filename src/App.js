import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Player from "./Player";

function Admin() {
  return <p>Admin</p>;
}

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <nav>NAVIGATTIE</nav>
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
