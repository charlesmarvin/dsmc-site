import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

const host = (document.location.hostname === 'localhost') ? 'http://localhost:8080' 
    : 'http://dsmc-api.cfapps.io';
const API_CONTEXT = host + '/api/';
const SECURE_API_CONTEXT = API_CONTEXT + 's/';
const JSON_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
const TO_JSON = function(response) {
    return response.json();
};

function r(method, url, data) {
    var headers = Object.assign({}, JSON_HEADERS);
    if (LoginStore.jwt) {
        Object.assign(headers, {Authorization: 'Bearer ' + LoginStore.jwt});
    }
    var options = {
        method,
        headers
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return fetch(url, options).then(TO_JSON);
}

export default {
    getStudents() {
        return r('get', SECURE_API_CONTEXT + 'students');
    },
    
    getStudent(id) {
        return r('get', SECURE_API_CONTEXT + 'students/' + id);
    },
    
    createStudent(student) {
        return r('post', SECURE_API_CONTEXT + 'students', student);
    },
    
    updateStudent(id, student) {
        return r('put', SECURE_API_CONTEXT + 'students/' + id, student);
    },
    
    getInstructors() {
        return r('get', SECURE_API_CONTEXT + 'instructors');
    },
    
    getInstructor(id) {
        return r('get', SECURE_API_CONTEXT + 'instructors/' + id);
    },
    
    createInstructor(instructor) {
        return r('post', SECURE_API_CONTEXT + 'instructors', instructor);
    },
    
    updateInstructor(id, instructor) {
        return r('put', SECURE_API_CONTEXT + 'instructors/' + id, instructor);
    },
    
    getPackages() {
        return r('get', SECURE_API_CONTEXT + 'packages');
    },
    
    getPackage(id) {
        return r('get', SECURE_API_CONTEXT + 'packages/' + id);
    },
    
    createPackage(pkg) {
        return r('post', SECURE_API_CONTEXT + 'packages', pkg);
    },
    
    updatePackage(id, pkg) {
        return r('put', SECURE_API_CONTEXT + 'packages/' + id, pkg);
    }
};
