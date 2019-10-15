import * as React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bucket: "test", type: "" };
    this.sendToDB = this.sendToDB.bind(this);
    this.storeFile = this.storeFile.bind(this);
    this.db = firebase.database();
    this.ref = this.db.ref("/queue");
    console.log(this.ref);
  }

  storeFile(e) {
    let uplo = document.querySelector("#uploader");
    const file = e.target.files[0];
    // console.log(file);
    this.setState({
      bucket: String(file.name)
    });
    const storageRef = firebase.storage().ref(file.name);
    let task = storageRef.put(file);

    var x = this;
    task.on(
      "state_changed",
      function progress(snapshot) {
        let perc = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uplo.value = perc;
      },
      null,
      function(snapshot) {
        console.log("upload complete!");
        console.log(storageRef.getDownloadURL());
        storageRef.getDownloadURL().then(function(url) {
          console.log(url);
          x.setState({
            bucket: url
          });
        });
        // var value = storageRef.getDownloadURL().then;
      }
    );
    // this.sendToDB("", this.state.bucket);
  }

  sendToDB() {
    var obj = { type: "video", url: this.state.bucket };
    //this.ref.push(obj);
    console.log(obj);
    firebase
      .database()
      .ref("/queue")
      .push(obj);
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
            <br />
            <label id="lab" htmlFor="sel">
              type:
            </label>
            <select id="sel">
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
