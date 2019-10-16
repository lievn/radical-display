import * as React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bucket: "test", type: "" };
    this.sendToDB = this.sendToDB.bind(this);
    this.storeFile = this.storeFile.bind(this);
    this.storeType = this.storeType.bind(this);
    this.db = firebase.firestore();
    //this.ref = this.db.ref("/queue");
    //console.log(this.ref);
  }

  storeFile(e) {
    let uplo = document.querySelector("#uploader");
    const file = e.target.files[0];
    this.setState({
      bucket: String(file.name),
      type: ""
    });
    const storageRef = firebase.storage().ref(file.name);
    let task = storageRef.put(file);

    var thisParent = this;
    task.on(
      "state_changed",
      function progress(snapshot) {
        let perc = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uplo.value = perc;
      },
      null,
      function(snapshot) {
        //console.log("upload complete!");
        let pOut = document.querySelector(".done");
        pOut.innerHTML = "upload complete";
        console.log(storageRef.getDownloadURL());
        storageRef.getDownloadURL().then(function(url) {
          console.log(url);
          thisParent.setState({
            bucket: url
          });
        });
      }
    );
  }

  storeType(e) {
    var d = document.querySelector("select");
    this.setState({
      type: d.options[d.selectedIndex].value
    });
  }

  sendToDB() {
    var obj = { type: this.state.type, url: this.state.bucket };
    console.log(obj);
    this.db
      .collection("queue")
      .add(obj)
      .then(docRef => {
        console.log(docRef.id);
      })
      .catch(error => {
        console.log(error);
      });

    //.database()
    //.ref("/queue")
    //.push(obj);
  }

  render() {
    return (
      <div className="noise">
        <div className="container">
          <h3>Add image/video</h3>
          <div className="form">
            <input type="file" id="file" onChange={this.storeFile} />
            <br />
            <progress value="5" max="100" id="uploader">
              0%
            </progress>
            <p className="done">.</p>
            <br />
            <label id="lab" htmlFor="sel">
              type:
            </label>
            <select id="sel" onChange={this.storeType}>
              <option value="image">image</option>
              <option value="video">video</option>
            </select>
            <br />
            <button onClick={this.sendToDB}>send</button>
          </div>
        </div>
      </div>
    );
  }
}
