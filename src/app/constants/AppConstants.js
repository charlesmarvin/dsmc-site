var baseurl = 'http://dsmc-api.cfapps.io';
if (document.location.hostname === 'localhost') {
    baseurl = 'http://localhost:8080';
}
export default {
    API_CONTEXT: baseurl + '/api/',
    SECURE_API_CONTEXT: baseurl + '/api/s/',
    JSON_HEADERS: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    //Login constants
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT_USER: 'LOGOUT_USER',
    LOGIN_REQUESTED: 'LOGIN_REQUESTED',

    //dashboard constants
    DASHBOARD_REQUESTED: 'DASHBOARD_REQUESTED',
    DASHBOARD_REQUEST_SUCCESS: 'DASHBOARD_REQUEST_SUCCESS',
    DASHBOARD_REQUEST_FAILURE: 'DASHBOARD_REQUEST_FAILURE',

    //student constants
    STUDENTS_REQUESTED: 'STUDENTS_REQUESTED',
    STUDENTS_REQUEST_SUCCESS: 'STUDENTS_REQUEST_SUCCESS',
    STUDENTS_REQUEST_FAILURE: 'STUDENTS_REQUEST_FAILURE',

    INSTRUCTORS_REQUESTED: 'INSTRUCTORS_REQUESTED',
    INSTRUCTORS_REQUEST_SUCCESS: 'INSTRUCTORS_REQUEST_SUCCESS',
    INSTRUCTORS_REQUEST_FAILURE: 'INSTRUCTORS_REQUEST_FAILURE'
};
