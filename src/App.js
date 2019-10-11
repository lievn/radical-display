import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Player from "./Player";
import Admin from "./Admin";
import "./App.css";
import firebase from "firebase/app";
import "firebase/database";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(firebaseConfig);
    console.log(firebase.database());
    this.db = firebase.database();
    this.ref = this.db.ref("/queue");
    console.log(this.ref);
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

const firebaseConfig = {
  apiKey: "AIzaSyARYN2XNweVC6TR-hePJ1yXgLiBkQTgn3U",
  authDomain: "radical-display.firebaseapp.com",
  databaseURL: "https://radical-display.firebaseio.com",
  projectId: "radical-display",
  storageBucket: "radical-display.appspot.com",
  messagingSenderId: "515210546131",
  appId: "1:515210546131:web:25bb98b16bd7f6091a3d26"
};
