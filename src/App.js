import React, { Component } from "react";
import Plotter from "./modules/plot";
import Controller from "./modules/controller"
import {lorenz} from "./modules/calculation"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";

class App extends Component {
  state = {
    loading: true,
    x0: 0,
    y0: 1,
    z0: 1.05,
    dt: 0.01,
    f_time: 150,
    sigma: 10,
    beta: 28,
    rho: 8 / 3
  };
   componentDidMount = async () => {
    let output = await lorenz(0, 1, 1.05, 0.01, 150, 10, 28, 8 / 3);
    this.setState({
      loading: true,
      output : output
    });
  }
  handleLoaded = () => {
    this.setState({
      loading: false
    });
  };

  handleNewGraph = (newOutput) => {
    this.setState({
      output : newOutput,
      newplot : false
    })
  }
  handleNewPlot = () => {
    this.setState({
      newplot : true
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
              <Col>
              <div>
                <Plotter
                  output = {this.state.output}
                  handleLoad={this.handleLoaded}
                  newPlot = {this.handleNewPlot}
                ></Plotter>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Controller newplot={this.state.newplot} handleNewGraph={this.handleNewGraph}></Controller>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
