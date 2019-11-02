import * as React from "react";
import { Link } from "react-router-dom";
import "./AdminGlitch.css";

const FILE_TYPES = {
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  mp4: "movie"
};

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
      /*isUploading: false,
      uploadProgress: 0,
      shapes: []*/
    };
    /*
    this.db = firebase.firestore();
    this._nextShapeId = 1;
    this._onSelectFile = this._onSelectFile.bind(this);
    //this._updateShapes = this._updateShapes.bind(this);
    this._onClickUpload = this._onClickUpload.bind(this);
    window.setTimeout(this._updateShapes, random(100, 500));*/
  }


  render() 
  {
    const { isUploading, uploadProgress, message, shapes } = this.state;
    return (
      <div className="admin-app">
        <div className="form">
          <h1>Admin ZZZZZUpload Interface</h1>
          <h2>Accessssss Forbidden</h2>
          <button
            disabled={isUploading}
            className="uploadButton"
            onClick={this._onClickUpload}
          >
            <span className="uploadButton__background"></span>
            <span className="uploadButton__label">Upload Image / Movie</span>
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
