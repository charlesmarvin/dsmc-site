import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {
    API_CONTEXT, 
    DASHBOARD_REQUESTED, 
    DASHBOARD_REQUEST_SUCCESS, 
    DASHBOARD_REQUEST_FAILURE,
    STUDENTS_REQUESTED,
    STUDENTS_REQUEST_SUCCESS,
    STUDENTS_REQUEST_FAILURE,
    INSTRUCTORS_REQUESTED,
    INSTRUCTORS_REQUEST_SUCCESS,
    INSTRUCTORS_REQUEST_FAILURE
} from '../constants/AppConstants.js';
import {get} from 'utils/JsonFetch';

export default {
    loadDashboardData: () => {
        AppDispatcher.dispatch({
            actionType: DASHBOARD_REQUESTED
        });
        return get(API_CONTEXT + 'dashboard')
        .then((data) => {
            console.debug('Dashboard data loaded successfully.');
            AppDispatcher.dispatch({
                actionType: DASHBOARD_REQUEST_SUCCESS,
                ...data
            });
        })
        .catch((e) => {
            console.warn('Failed to load dashboard data. Error: ' + JSON.stringify(e));
            AppDispatcher.dispatch({actionType: DASHBOARD_REQUEST_FAILURE});
        });
    },

    loadStudents: () => {
        AppDispatcher.dispatch({
            actionType: STUDENTS_REQUESTED
        });
        return get(API_CONTEXT + 'students')
        .then((data) => {
            console.debug('Students loaded successfully.');
            AppDispatcher.dispatch({
                actionType: STUDENTS_REQUEST_SUCCESS,
                students: data
            });
        })
        .catch((e) => {
            console.warn('Failed to load students. Error: ' + JSON.stringify(e));
            AppDispatcher.dispatch({actionType: STUDENTS_REQUEST_FAILURE});
        });
    },

    loadInstructors: () => {
        AppDispatcher.dispatch({
            actionType: INSTRUCTORS_REQUESTED
        });
        return get(API_CONTEXT + 'instructors')
        .then((data) => {
            console.debug('instructors loaded successfully.');
            AppDispatcher.dispatch({
                actionType: INSTRUCTORS_REQUEST_SUCCESS,
                instructors: data
            });
        })
        .catch((e) => {
            console.warn('Failed to load instructors. Error: ' + JSON.stringify(e));
            AppDispatcher.dispatch({actionType: INSTRUCTORS_REQUEST_FAILURE});
        });
    }
};
