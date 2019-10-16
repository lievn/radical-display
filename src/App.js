import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DB_CONFIG } from "./DBconfig";
import Player from "./Player";
import Admin from "./Admin";
import "./App.css";
import firebase from "firebase/app";
import "firebase/database";
let db;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(DB_CONFIG);
    }
  }

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
