import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DB_CONFIG } from "./DBconfig";
import Player from "./Player";
import Admin from "./Admin";
import AdminGlitch from "./AdminGlitch";
/*import Glitch from "./Glitch";*/
import Overlord from "./Overlord";
import firebase from "firebase/app";

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
            <Player />
            <Admin />  
            <AdminGlitch/> 
          </Route>
          <Route exact path="/overlord">
            <Overlord />
          </Route>
          <Route>
            <p>404</p>
          </Route>
        </Switch>
      </Router>
    );
  }
}
