require('styles/main.sass');
require('vendor/kube/kube.less');
require('font-awesome-webpack');

var React = require('react');
var Router = require('react-router');
var {Route, DefaultRoute, NotFoundRoute} = Router;

var Main = require('./Main');
var NotFound = require('./NotFound');
var Dashboard = require('./Dashboard');
var Packages = require('./Packages');
var Package = require('./Package');
var Students = require('./Students');
var Student = require('./Student');
var Admin = require('./Admin');

var Routes = (
    <Route handler={Main}>
        <DefaultRoute handler={Dashboard}/>
        <Route name="dashboard" handler={Dashboard}/>
        <Route name="packages" handler={Packages}/>
        <Route name="package" path="package/:id" handler={Package}/>
        <Route name="students" handler={Students}/>
        <Route name="student" path="student/:id" handler={Student} />
        <Route name="instructors" handler={NotFound}/>
        <Route name="admin" handler={Admin}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

Router.run(Routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});
