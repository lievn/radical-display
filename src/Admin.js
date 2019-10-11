import * as React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import firebase from "firebase/app";
import "firebase/storage";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  storeFile(e) {
    let uplo = document.querySelector("#uploader");
    const file = e.target.files[0];
    console.log(file);
    const storageRef = firebase.storage().ref(file.name);
    let task = storageRef.put(file);
    task.on("state_changed", function progress(snapshot) {
      let perc = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uplo.value = perc;
    });
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
            <button>send</button>
          </div>
        </div>
      </div>
    );
  }
}
