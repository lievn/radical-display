import * as React from "react";
import { Link } from "react-router-dom";
import "./Player.css";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { queue: [], index: 0 };
    this.checkVid = this.checkVid.bind(this);
    this.goNext = this.goNext.bind(this);
    this.changeInMillis = 5000;
  }

  async componentDidMount() {
    const res = await fetch(
      "https://firestore.googleapis.com/v1/projects/radical-display/databases/(default)/documents/queue/"
    );
    const json = await res.json();
    this.setState({
      queue: json.documents,
      index: this.state.index
    });
    this.checkVid();
  }

  goNext() {
    this.setState({
      index: (this.state.index + 1) % this.state.queue.length
    });
    this.checkVid();
  }

  checkVid() {
    let i = document.querySelector("img");
    let v = document.querySelector("video");
    if (this.state.queue[this.state.index].fields.type.stringValue == "image") {
      i.src = this.state.queue[this.state.index].fields.url.stringValue;
      i.style.zIndex = 100;
      v.style.zIndex = 10;
      setTimeout(this.goNext, this.changeInMillis);
    } else {
      v.src = this.state.queue[this.state.index].fields.url.stringValue;
      v.style.zIndex = 100;
      i.style.zIndex = 10;
      v.addEventListener("ended", this.goNext);
      //v.play();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="imgContainer">
          <img src="test.png" />
        </div>
        <div className="videoContainer">
          <video
            autoPlay
            muted
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          ></video>
        </div>
        <footer>
          <Link to="/admin">π</Link>
        </footer>
      </div>
    );
  }
}
