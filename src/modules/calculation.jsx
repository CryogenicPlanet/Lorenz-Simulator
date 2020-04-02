import  {Component} from 'react'
import np from 'numjs' // Numpy Emulator for Javascript

class Calculation extends Component {
    // Default Constants of Lorenz System
    state = {
        sigma : 10,
        rho : 28,
        beta : 8/3
    }
    setconstants = (s,r,b) => { 
        this.setState({
            sigma : s || 10,
            rho : r || 28,
            beta : b || 8/3
        })
    }
    // Equations of Lorenz System
    dx = (x,y,z) => {
        return this.state.sigma*(y-x)
    }
    dy = (x,y,z) => {
        return x*(this.state.rho -z) - y
    }
    dz = (x,y,z) => {
        return x*y - this.state.beta*z
    }
    // Runge-Kutta 4th order method, read further https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods
    rk4 = (a,b,c,dt) => {
        var derrivatives = [this.dx,this.dy,this.dz]
        var k1 = [] 
        var k2 = []
        var k3 = [] 
        var k4 = [] 
        // Creating four blank arrays for iteration
        for(let df of derrivatives){
            k1.push(dt*df(a,b,c)) // First Iteration of RK4
        }
        for(let df of derrivatives){
            k2.push(dt*df(a+k1[0]/2,b+k1[1]/2,c+k1[2]/2)) // Second Iteration of RK4
        }
        for(let df of derrivatives){
            k3.push(dt*df(a+k2[0]/2,b+k2[1]/2,c+k2[1]/2)) // Third Iteration of RK4
        }
        for(let df of derrivatives){
            k4.push(dt*df(a+k3[0],b+k3[1],c+k3[2])) // Fourth Iteration of RK4
        }
        // Creating Numpy Arrays
        k1 = np.array(k1)
        k2 = np.array(k2)
        k3 = np.array(k3)
        k4 = np.array(k4)
        // Vector Addition of Numpy Arrays
        var output = np.add(k1,k2)
        output.add(k3)
        output.add(k4)
        output.divide(6) // 1/6 Multipliation from RK4 Defination
        
        // console.log("Calculation -> output", output)
        return output

    }

      

}

export function  lorenz(x_0,y_0,z_0,dt,final_time,s,r,b) {
    // Arrays for Positions of X,Y,Z, intiatlized with 0th(Start) position
    var calc = new Calculation()
    calc.setconstants(s,r,b)
    var x = [x_0]
    var y = [y_0]
    var z = [z_0]
    var count = 0
    var t = 0
    while (t < final_time){
        t += dt
        let tempx = x[count]
        let tempy = y[count]
        let tempz = z[count]
        let runge_kutta_4 = calc.rk4(tempx,tempy,tempz,dt).tolist()
        // console.log("lorenz -> runge_kutta_4", runge_kutta_4)
        tempx += runge_kutta_4[0]
        tempy += runge_kutta_4[1]
        tempz += runge_kutta_4[2]
        count += 1
        x.push(tempx)
        y.push(tempy)
        z.push(tempz)
    }
    // //console.log("Lorenz -> x",x)
    return [x,y,z]
}



