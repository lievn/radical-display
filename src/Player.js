import * as React from "react";
import { Link } from "react-router-dom";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { queue: [] };
  }

  async componentDidMount() {
    const res = await fetch(
      "https://firestore.googleapis.com/v1/projects/radical-display/databases/(default)/documents/queue/"
    );
    const json = await res.json();
    this.setState({ queue: json.documents });
  }

  render() {
    return (
      <div>
        <h1>player</h1>
        <pre>{JSON.stringify(this.state.queue, null, 2)}</pre>
        <footer>
          <Link to="/admin">π</Link>
        </footer>
      </div>
    );
  }
}
