import React, { Component } from "react";
import {lorenz} from './calculation'
import { Card, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";

class Controller extends Component {
  state = {
    x0: 0,
    y0: 1,
    z0: 1.05,
    dt: 0.01,
    f_time: 150,
    sigma: 10,
    beta: 28,
    rho: 8 / 3,
    submit : false
  };
  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };
  handleClick = event => {
    this.setState({
        submit : true
    })
    let curState = this.state;
    let output = lorenz(curState.x0,curState.y0,curState.z0,curState.dt,curState.f_time,curState.sigma,curState.rho,curState.beta);
    this.props.handleNewGraph(output);
  }
  componentDidUpdate(prevProps){
      if(this.props.newplot !== prevProps.newplot){
        if(this.props.newplot === true){
            this.setState({
                submit : false
            })
        }
      }
  }
  render() {
    return (
      <Card bg="dark" text="light">
        <Card.Body>
          <Card.Title>Lorenz System Simulator</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Simulator Control Panel
          </Card.Subtitle>
          <Card.Text>
            <Form>
              <fieldset>
                <Form.Group as={Row} className="justify-content-md-center">
                  <Form.Label>Start Points</Form.Label>
                  <Col sm={10} offset={1}>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>X, Y , Z</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        name="x0"
                        type="number"
                        value={this.state.x0}
                        onChange={this.handleChange}
                      />
                      <FormControl
                        name="y0"
                        type="number"
                        value={this.state.y0}
                        onChange={this.handleChange}
                      />
                      <FormControl
                        name="z0"
                        type="number"
                        value={this.state.z0}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                  </Col>
                </Form.Group>
              </fieldset>
              <fieldset>
                <Form.Group as={Row} className="justify-content-md-center">
                  <Form.Label>Time</Form.Label>
                  <Col sm={10} offset={1}>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          Time Step(dt), End Time
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        name="dt"
                        type="number"
                        value={this.state.dt}
                        onChange={this.handleChange}
                      />
                      <FormControl
                        name="f_time"
                        type="number"
                        value={this.state.f_time}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                  </Col>
                </Form.Group>
              </fieldset>
              <fieldset>
                <Form.Group as={Row} className="justify-content-md-center">
                  <Form.Label>Constants</Form.Label>
                  <Col sm={10} offset={1}>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>Sigma, Beta, Rho</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        name="sigma"
                        type="number"
                        value={this.state.sigma}
                        onChange={this.handleChange}
                      />
                      <FormControl
                        name="beta"
                        type="number"
                        value={this.state.beta}
                        onChange={this.handleChange}
                      />
                      <FormControl
                        name="rho"
                        type="number"
                        value={this.state.rho}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                  </Col>
                </Form.Group>
              </fieldset>
              <Button variant="primary" onClick={this.handleClick} disabled={this.state.submit}>
                Submit
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Controller;
