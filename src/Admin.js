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

function Shape({ x, y, size, className }) {
  return (
    <div
      className={`shape ${className}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`
      }}
    ></div>
  );
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

function randInt(min, max) {
  return Math.floor(random(min, max));
}

function choice(l) {
  return l[Math.floor(Math.random() * l.length)];
}

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      isUploading: false,
      uploadProgress: 0,
      shapes: []
    };
    this.db = firebase.firestore();
    this._nextShapeId = 1;
    this._onSelectFile = this._onSelectFile.bind(this);
    this._updateShapes = this._updateShapes.bind(this);
    this._onClickUpload = this._onClickUpload.bind(this);
    window.setTimeout(this._updateShapes, random(100, 500));
  }

  _updateShapes() {
    const SHAPE_CLASSES = [
      "shape__rect-stroked",
      "shape__rect-filled",
      "shape__oval-filled",
      "shape__oval-stroked"
    ];
    let shapes = this.state.shapes;
    if (Math.random() > 0.9) {
      shapes = shapes.splice(0, 1);
    }
    if (Math.random() > 0.2) {
      const x = randInt(0, 80) * 25;
      const y = randInt(0, 40) * 25;
      const size = randInt(1, 10) * 50;
      const className = choice(SHAPE_CLASSES);
      shapes.push(
        <Shape
          key={this._nextShapeId}
          x={x}
          y={y}
          size={size}
          className={className}
        />
      );
      this._nextShapeId++;
    }
    console.log(shapes);
    this.setState({ shapes });
    window.setTimeout(this._updateShapes, random(100, 500));
  }

  _onSelectFile(e) {
    const file = e.target.files[0];
    const filename = file.name;
    const fileExt = filename
      .substring(filename.lastIndexOf(".") + 1)
      .toLowerCase();
    const fileType = FILE_TYPES[fileExt];
    if (!fileType) {
      this.setState({ message: "#ERR(9979)# Unknown file type" });
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
          message: "#ERR(0967)# Error while uploading. Is your file too big?",
          isUploading: false
        });
      },
      snapshot => {
        console.log("storageRef", storageRef);
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
        this.setState({
          message: "//// Upload Completed //// ",
          isUploading: false
        });
      })
      .catch(error => {
        this.setState({ message: "#ERR(5633)# Error creating database entry" });
      });
  }

  _onClickUpload() {
    this.setState({ isUploading: true });
    this._fileInput.click();
  }

  render() {
    const { isUploading, uploadProgress, message, shapes } = this.state;
    return (
      <div className="app">
        <div className="form">
          <h1>Admin Upload Interface</h1>
          <h2>Access Forbidden</h2>
          <button
            disabled={isUploading}
            className="uploadButton"
            onClick={this._onClickUpload}
          >
            Upload Image / Movie
          </button>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            ref={node => (this._fileInput = node)}
            onChange={this._onSelectFile}
          />
          <progress
            className="uploadProgress"
            value={uploadProgress}
            max={100}
          />
          <p className="message">&nbsp;{message}&nbsp;</p>
        </div>
        <div className="shapes">{shapes}</div>
      </div>
    );
  }
}
