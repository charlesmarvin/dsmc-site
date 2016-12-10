require('basscss/css/basscss.css');
require('styles/main.css');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import RouterContainer from './common/RouterContainer';
import LoginActions from './auth/LoginActions';
import LoginStore from './auth/LoginStore';

import AppContainer from './main/AppContainer';
import NotFound from './common/NotFound';
import DashboardView from './dashboard/DashboardView';
import CourseListView from './course/CourseListView';
import CourseEditView from './course/CourseEditView';
import StudentsListView from './student/StudentsListView';
import StudentEditView from './student/StudentEditView';
import Admin from './admin/Admin';
import LoginView from './auth/LoginView';
import InstructorsListView from './instructor/InstructorsListView';
import InstructorEditView from './instructor/InstructorEditView';

var router = (
    <Router history={hashHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={DashboardView} onEnter={requireAuth}/>
            <Route path="courses" component={CourseListView} onEnter={requireAuth}>
                <Route path="/courses/:id" component={CourseEditView} onEnter={requireAuth}/>
            </Route>
            <Route path="students" component={StudentsListView} onEnter={requireAuth}>
                <Route path="/student/:id" component={StudentEditView} onEnter={requireAuth}/>
            </Route>
            <Route path="instructors" component={InstructorsListView} onEnter={requireAuth}>
                <Route path="/instructor/:id" component={InstructorEditView} onEnter={requireAuth}/>
            </Route>
            <Route path="admin" component={Admin} onEnter={requireAuth}/>
            <Route path="login" component={LoginView}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);

function requireAuth(nextState, replace) {
    if (!LoginStore.isLoggedIn) {
        replace('/login');
    }
}

RouterContainer.set(router);

LoginActions.authenticateFromToken();

ReactDOM.render(router, document.getElementById('app'));
