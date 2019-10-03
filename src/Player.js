import * as React from "react";
import { Link } from "react-router-dom";

export default class Player extends React.Component {
  render() {
    return (
      <div>
        <h1>player</h1>
        <footer>
          <Link to="/admin">π</Link>
        </footer>
      </div>
    );
  }
}
