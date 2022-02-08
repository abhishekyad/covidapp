import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './CovidList'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import IndiaMap from "./IndiaMap";
import mask from './mask.png';
import inshorts from './inshorts.png';

class App extends Component {
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Win Over COVID</h1>
          <h1 className="App-title2"> ... and InShorts too!</h1>
          <img src={inshorts} className="icon"/>
        </header>
        <div className="hori">
          <Switch >
                <Route exact path= "/" render={() => (
                  <Redirect to="/customerlist"/>
                )}/>
                 <Route exact path='/customerlist' component={Customers} />
          </Switch>
        <div  className="App-map">
        <IndiaMap/>
        </div >
        <div className="mask">
        <p>We Shall Overcome</p>
        <img src={mask}/>
        </div>
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
