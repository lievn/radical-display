import * as React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const FILE_TYPES = {
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  mp4: "movie"
};

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "", uploadProgress: 0 };
    this.db = firebase.firestore();
    this._onSelectFile = this._onSelectFile.bind(this);
  }

  _onSelectFile(e) {
    const file = e.target.files[0];
    const filename = file.name;
    const fileExt = filename
      .substring(filename.lastIndexOf(".") + 1)
      .toLowerCase();
    const fileType = FILE_TYPES[fileExt];
    if (!fileType) {
      this.setState({ message: "Unknown file type" });
      return;
    }
    const storageRef = firebase.storage().ref(filename);
    const task = storageRef.put(file);
    task.on(
      "state_changed",
      snapshot => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ uploadProgress });
      },
      error => {
        this.setState({
          message: "Error while uploading. Is your file too big?"
        });
      },
      snapshot => {
        console.log("storageRef", storageRef);
        this.setState({ message: "Upload completed. " });
        this._sendToDB(fileType, storageRef);
      }
    );
  }

  async _sendToDB(fileType, storageRef) {
    const fileUrl = await storageRef.getDownloadURL();
    const obj = { type: fileType, url: fileUrl };
    console.log("_sendToDB", obj);
    this.db
      .collection("queue")
      .add(obj)
      .then(docRef => {
        console.log("docRef", docRef);
        this.setState({ message: "//// Screen successfully hacked //// " });
      })
      .catch(error => {
        this.setState({ message: "Error while creating database entry" });
      });
  }

  render() {
    const { uploadProgress, message } = this.state;
    return (
      <div className="noise">
        <div className="container">
          <h3>Add image/video</h3>
          <div className="form">
            <input type="file" id="file" onChange={this._onSelectFile} />
            <br />
            <progress value="{ uploadProgress }" max="100" id="uploader">
              0%
            </progress>
            <p className="message">{message}</p>
          </div>
        </div>
      </div>
    );
  }
}
