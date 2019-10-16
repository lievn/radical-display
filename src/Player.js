import * as React from "react";
import { Link } from "react-router-dom";
import "./Player.css";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      index: 0,
      vid: "",
      img: "",
      vidVisual: "",
      imgVisual: ""
    };
    this.checkVid = this.checkVid.bind(this);
    this.goNext = this.goNext.bind(this);
    this.changeInMillis = 1000;
  }

  async componentDidMount() {
    const res = await fetch(
      "https://firestore.googleapis.com/v1/projects/radical-display/databases/(default)/documents/queue/"
    );
    const json = await res.json();
    this.setState({
      queue: json.documents
    });
    this.checkVid();
  }

  goNext() {
    this.setState({
      index: (this.state.index + 1) % this.state.queue.length
    });
    this.checkVid();
    console.log(this.state.index);
  }

  checkVid() {
    let v = document.querySelector("video");
    console.log(this.state.imgVisual);
    if (this.state.queue[this.state.index].fields.type.stringValue == "image") {
      this.setState({
        img: this.state.queue[this.state.index].fields.url.stringValue,
        imgVisual: "visible",
        vidVisual: "hidden"
      });
      setTimeout(this.goNext, this.changeInMillis);
    } else {
      this.setState({
        vid: this.state.queue[this.state.index].fields.url.stringValue,
        imgVisual: "hidden",
        vidVisual: "visible"
      });
      v.addEventListener("ended", this.goNext);
      v.play();
    }
  }

  render() {
    return (
      <div className="container">
        <div
          className="imgContainer"
          style={{ visibility: `${this.state.imgVisual}` }}
        >
          <img src={this.state.img} />
        </div>
        <div
          className="videoContainer"
          style={{ visibility: `${this.state.vidVisual}` }}
        >
          <video autoPlay muted src={this.state.vid}></video>
        </div>
        <footer>
          <Link to="/admin">π</Link>
        </footer>
      </div>
    );
  }
}
