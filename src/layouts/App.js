import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import DashboardView from '../views/Dashboard';
import LoginView from '../views/Login';
import Nav from '../modules/Nav';

class App extends Component {
  render() {
    return (
        <Router>
            <div>
               <Nav/>
                <Route exact path="/" component={DashboardView}/>
                <Route path="/login" component={LoginView}/>
            </div>
        </Router>
    );
  }
}

export default App;