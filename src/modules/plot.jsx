import React, { Component, Fragment } from "react";
import { lorenz } from "./calculation";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";
import Loader from "./loading";

class Plotter extends Component {
  state = {
    x: [],
    y: [],
    z: [],
    root: "graph",
    loading: "block",
    data : null
  };
  componentDidUpdate(prevProps) {
    // If the component updates then it will redo the commputation
    //   if(this.props.x0 !== prevProps.x0 || this.props.y0 !== prevProps.y0 || this.props.z0 !== prevProps.z0 || this.props.dt !== prevProps.dt
    //     || this.props.t !==  prevProps.t || this.props.s !== prevProps.s || this.props.r !== prevProps.r || this.props.b !== prevProps.b){
    //   var x0 = this.props.x0 || 0
    //   var y0 = this.props.y0 || 1
    //   var z0 = this.props.z0 || 1.05
    //   var dt = this.props.dt || 0.01
    //   var t = this.props.t || 150
    //   var s = this.props.s || 10
    //   var r = this.props.r || 28
    //   var b = this.props.b || 8/3
    //   var output = lorenz(x0,y0,z0,dt,t,s,r,b)
    //   this.setState({
    //     x : output[0],
    //     y: output[1],
    //     z: output[2]
    // })
    // }
    if(this.props.output !== prevProps.output){
      let output = this.props.output
      this.setState({
            x : output[0],
            y: output[1],
            z: output[2]
        })
        this.setData();
        this.props.newPlot()
    }
    Plotly.react(this.state.root,this.state.data,{ margin: { l: 0, r: 0, b: 0, t: 0 } },{ responsive: true })
  }

  setData = () => {
    let newData = [
      {
        x: this.state.x,
        y: this.state.y,
        z: this.state.z,
        type: "scatter3d",
        mode: "line",
        marker: {
          size: 2,
          line: {
            color: "rgba(0, 0, 217, 0.7)",
            width: 0.05
          },
          opacity: 0.1
        }
      },
      { type: "scatter3d", x: [1, 2, 3], y: [2, 5, 3] }
    ];

    this.setState({
      data : newData
    })
  }

  handleLoad = () => {
    if (this.state.loading === "hidden") {
      this.setState({
        loading: "block"
      });
    }
  };

  // componentDidMount() {
  //   let output = this.props.output
  //   console.log("Got output in plotter");
  //   this.setState({
  //     x: output[0],
  //     y: output[1],
  //     z: output[2]
  //   });
  //   this.setData()
  // }
  render() {
    return (
      <Fragment>
        {this.state.loading === "none" ? <Loader></Loader> : null}
        <Plot
          divId = {this.state.root}
          onAfterPlot={this.handleLoad}
          style={{ display: this.state.loading }}
          data={this.state.data}
          layout={{ margin: { l: 0, r: 0, b: 0, t: 0 } }}
          config={{ responsive: true }}
        />
      </Fragment>
    );
  }
}
export default Plotter;
