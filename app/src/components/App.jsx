require('styles/main.sass');
require('vendor/kube/kube.less');
require('font-awesome-webpack');

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';

var Main = require('./Main');
var NotFound = require('./NotFound');
var Dashboard = require('./Dashboard');
var Packages = require('./Packages');
var Package = require('./Package');
var Students = require('./Students');
var Student = require('./Student');
var Admin = require('./Admin');

render((
        <Router>
            <Route path="/" component={Main}>
                <IndexRoute component={Dashboard}/>
                <Route path="packages" component={Packages}/>
                <Route path="package" path="package/:id" component={Package}/>
                <Route path="students" component={Students}/>
                <Route path="student/:id" component={Student} />
                <Route path="instructors" component={NotFound}/>
                <Route path="admin" component={Admin}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    ), document.getElementById('content'));
