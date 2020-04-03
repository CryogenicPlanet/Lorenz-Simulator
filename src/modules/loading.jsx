import React, { Component } from "react";
import Loading from "react-loading-spinkit";

class Loader extends Component {
  render() {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Loading
          show="true"
          name="wandering-cubes"
          color="#5282ef"
        ></Loading>
      </div>
    );
  }
}

export default Loader;
