import * as React from "react";
import { Link } from "react-router-dom";
import "./Player.css";
import firebase from "firebase/app";
import "firebase/firestore";

const TIME_PER_VIDEO_MILLIS = 60 * 1000;
const TIME_PER_IMAGE_MILLIS = 10 * 1000;

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      index: 0
    };
    this._goNext = this._goNext.bind(this);
    this._goNextTimeout = null;
  }

  async componentDidMount() {
    this._db = firebase.firestore();
    this._db
      .collection("queue")
      .orderBy("created", "desc")
      .onSnapshot(snap => {
        const documents = snap.docs.map(doc => doc.data());
        this.setState({
          queue: documents,
          index: 0
        });
        this._scheduleNext();
      });
  }

  _goNext() {
    this.setState({
      index: (this.state.index + 1) % this.state.queue.length
    });

    this._scheduleNext();
  }

  _scheduleNext() {
    const currentItem = this.state.queue[this.state.index];
    if (!currentItem) return;
    let time;
    if (currentItem.type === "image") {
      time = TIME_PER_IMAGE_MILLIS;
    } else if (currentItem.type === "movie") {
      time = TIME_PER_VIDEO_MILLIS;
    } else {
      return;
    }
    window.clearTimeout(this._goNextTimeout);
    this._goNextTimeout = window.setTimeout(this._goNext, time);
  }

  render() {
    let player;
    const currentItem = this.state.queue[this.state.index];
    if (!currentItem) {
      player = <h1>Loading...</h1>;
    } else if (currentItem.type === "image") {
      player = (
        <div className="imgContainer">
          <img src={currentItem.url} />
        </div>
      );
    } else if (currentItem.type === "movie") {
      player = (
        <div className="videoContainer">
          <video autoPlay muted src={currentItem.url} onEnded={this._goNext} />
        </div>
      );
    } else {
      player = <h1>Unknown item type {currentItem.type} </h1>;
    }
    return (
      <div className="container">
        {player}
        <footer>
          <Link to="/admin">π</Link>
        </footer>
        <div class="player__overlay">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
