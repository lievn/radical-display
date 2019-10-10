import * as React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h4>Add image/video</h4>
        <div className="form">
          <label id="lab" htmlFor="file">
            upload file:
          </label>
          <input type="file" id="file" />
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
    );
  }
}
