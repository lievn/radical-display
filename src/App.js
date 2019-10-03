import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Viewer() {
  return <p>Viewer</p>;
}

function Admin() {
  return <p>Admin</p>;
}

export class App extends React.Component {
  render() {
    return (
      <Router>
        <nav>NAVIGATTIE</nav>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route exact path="/">
            <Viewer />
          </Route>
          <Route>
            <p>404</p>
          </Route>
        </Switch>
      </Router>
    );
  }
}
