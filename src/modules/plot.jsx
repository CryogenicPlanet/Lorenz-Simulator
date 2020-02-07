import React,{Component} from 'react'
import {lorenz} from './calculation'
import Plot from 'react-plotly.js';

class Plotter extends Component {
    state = {
        x : [],
        y : [],
        z : []
    }
    
    componentDidMount(){
    var x0 = this.props.x0 || 0
    var y0 = this.props.y0 || 1
    var z0 = this.props.z0 || 1.05
    var dt = this.props.dt || 0.01
    var t = this.props.t || 150
    var s = this.props.s || 10
    var r = this.props.r || 28
    var b = this.props.b || 8/3
    var output = lorenz(x0,y0,z0,dt,t,s,r,b)
    console.log(output)
    this.setState({
        x : output[0],
        y: output[1],
        z: output[2]
    })
    }
    
    render(){
        return(
            <Plot
            data={[
              {
                x: this.state.x,
                y: this.state.y,
                z : this.state.z,
                type: 'scatter3d',
                mode: 'lines+markers',
                marker: {color: 'red'},
              },
              {type: 'scatter3d', x: [1, 2, 3], y: [2, 5, 3]},
            ]}
            layout={ {margin:{l: 0,
                r: 0,
                b: 0,
                t: 0}} }
          />
        )
    }
}
export default Plotter