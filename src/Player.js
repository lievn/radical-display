import * as React from "react";
import { Link } from "react-router-dom";
import "./Player.css";
import firebase from "firebase/app";
import "firebase/firestore";

const TIME_PER_ITEM_MILLIS = 8000;

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
    this._goNext = this._goNext.bind(this);
    this._goNextTimeout = null;
    //this.changeInMillis = 5000;
  }

  async componentDidMount() {
    this._db = firebase.firestore();
    this._db
      .collection("queue")
      .orderBy("created", "desc")
      .onSnapshot(snap => {
        const documents = snap.docs.map(doc => doc.data());
        console.log(documents);
        this.setState({
          queue: documents,
          index: 0
        });
        this._scheduleNext();
        // this.checkVid();
      });
    //   const res = await fetch(
    //     "https://firestore.googleapis.com/v1/projects/radical-display/databases/(default)/documents/queue/"
    //   );
    //   const json = await res.json();
    //   this.setState({
    //     queue: json.documents
    //   });
    // setInterval(this._goNext, 5000);
  }

  _goNext() {
    this.setState({
      index: (this.state.index + 1) % this.state.queue.length
    });

    console.log(this.state.index);
    this._scheduleNext();
  }

  _scheduleNext() {
    window.clearTimeout(this._goNextTimeout);
    this._goNextTimeout = window.setTimeout(this._goNext, TIME_PER_ITEM_MILLIS);
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
          <video autoPlay muted src={currentItem.url} />
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
      </div>
    );
  }
}
