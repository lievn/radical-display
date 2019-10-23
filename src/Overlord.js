import * as React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "./Overlord.css";

export default class Overlord extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, items: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this._db = firebase.firestore();
    var docRef = this._db
      .collection("queue")
      .get()
      .then(snap => {
        console.log(snap.docs);
        const items = snap.docs.map(docSnap => ({
          id: docSnap.id,
          data: docSnap.data()
        }));
        this.setState({ items, isLoading: false });
      });

    this._db.collection("queue").onSnapshot(snap => {
      snap.docChanges().forEach(change => {
        if (change.type === "removed") {
          const items = snap.docs.map(docSnap => ({
            id: docSnap.id,
            data: docSnap.data()
          }));
          this.setState({ items, isLoading: false });
        }
      });
    });
  }

  handleClick(e) {
    console.log(e.item.id);
    const r = confirm("oh really?");
    if (r == true) {
      this._db
        .collection("queue")
        .doc(e.item.id)
        .delete()
        .then(function() {
          console.log("Item successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing item: ", error);
        });
    }
  }

  render() {
    const { isLoading, items } = this.state;
    return (
      <div className="app">
        <h1>overlord</h1>
        {isLoading && <p className="loading">Loading...</p>}
        <ul className="all">{items.map(item => this._renderItem(item))}</ul>
      </div>
    );
  }

  _renderItem(item) {
    console.log(item);
    if (item.data.type === "image") {
      return (
        <div
          className="item"
          key={item.id}
          onClick={this.handleClick.bind(this, { item })}
        >
          <img src={item.data.url} alt="" width="100" />
        </div>
      );
    } else if (item.data.type === "movie") {
      return (
        <div className="item" key={item.id}>
          <video src={item.data.url} width="100" />
        </div>
      );
    } else {
      throw new Error("Invalid item type", item);
    }
  }
}
