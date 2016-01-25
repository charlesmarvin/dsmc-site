var baseurl = 'http://dsmc-api.cfapps.io';
if (document.location.hostname === 'localhost') {
    baseurl = 'http://localhost:8080';
}
export const API_CONTEXT = baseurl + '/api/';
export const JSON_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';

export const DASHBOARD_REQUESTED = 'DASHBOARD_REQUESTED';
export const DASHBOARD_REQUEST_SUCCESS = 'DASHBOARD_REQUEST_SUCCESS';
export const DASHBOARD_REQUEST_FAILURE = 'DASHBOARD_REQUEST_FAILURE';

export const STUDENTS_REQUESTED = 'STUDENTS_REQUESTED';
export const STUDENTS_REQUEST_SUCCESS = 'STUDENTS_REQUEST_SUCCESS';
export const STUDENTS_REQUEST_FAILURE = 'STUDENTS_REQUEST_FAILURE';

export const INSTRUCTORS_REQUESTED = 'INSTRUCTORS_REQUESTED';
export const INSTRUCTORS_REQUEST_SUCCESS = 'INSTRUCTORS_REQUEST_SUCCESS';
export const INSTRUCTORS_REQUEST_FAILURE = 'INSTRUCTORS_REQUEST_FAILURE';
