require('styles/main.sass');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import RouterContainer from './common/RouterContainer';
import LoginActions from './auth/LoginActions';
import LoginStore from './auth/LoginStore';
import History from './common/utils/History';

const AppContainer = require('./main/AppContainer');
const NotFound = require('./common/NotFound');
const DashboardView = require('./dashboard/DashboardView');
const CourseListView = require('./course/CourseListView');
const CourseEditView = require('./course/CourseEditView');
const StudentsListView = require('./student/StudentsListView');
const StudentEditView = require('./student/StudentEditView');
const Admin = require('./admin/Admin');
const LoginView = require('./auth/LoginView');
const InstructorsTableView = require('./instructor/InstructorsTableView');
const InstructorView = require('./instructor/InstructorView');

var router = (
    <Router history={History}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={DashboardView} onEnter={requireAuth}/>
            <Route path="courses" component={CourseListView} onEnter={requireAuth}>
                <Route path="/courses/:id" component={CourseEditView} onEnter={requireAuth}/>
            </Route>
            <Route path="students" component={StudentsListView} onEnter={requireAuth}>
                <Route path="/student/:id" component={StudentEditView} onEnter={requireAuth}/>
            </Route>
            <Route path="instructors" component={InstructorsTableView} onEnter={requireAuth}>
                <Route path="/instructor/:id" component={InstructorView} onEnter={requireAuth}/>
            </Route>
            <Route path="admin" component={Admin} onEnter={requireAuth}/>
            <Route path="login" component={LoginView}/>
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

LoginActions.authenticateFromToken();

ReactDOM.render(router, document.getElementById('app'));
