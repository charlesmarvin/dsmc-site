require('styles/main.sass');
require('vendor/kube/kube.less');
require('font-awesome-webpack');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import RouterContainer from '../services/RouterContainer';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';
import History from 'utils/History';

const Main = require('./Main');
const NotFound = require('./NotFound');
const Dashboard = require('./Dashboard');
const Packages = require('./Packages');
const Package = require('./Package');
const Students = require('./Students');
const Student = require('./Student');
const Admin = require('./Admin');
const Login = require('./Login');

var router = (
    <Router history={History}>
        <Route path="/" component={Main}>
            <IndexRoute component={Dashboard} onEnter={requireAuth}/>
            <Route path="packages" component={Packages} onEnter={requireAuth}/>
            <Route path="package" path="package/:id" component={Package} onEnter={requireAuth}/>
            <Route path="students" component={Students} onEnter={requireAuth}/>
            <Route path="student/:id" component={Student} onEnter={requireAuth}/>
            <Route path="instructors" component={NotFound} onEnter={requireAuth}/>
            <Route path="admin" component={Admin} onEnter={requireAuth}/>
            <Route path="login" component={Login}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);

function requireAuth(nextState, replaceState) {
    if (!LoginStore.isLoggedIn) {
        replaceState({nextPathname: nextState.location.pathname}, '/login');
    }
}

RouterContainer.set(router);

let jwt = localStorage.getItem('jwt');
if (jwt) {
    LoginActions.loginUser(jwt);
}

ReactDOM.render(router, document.getElementById('content'));
