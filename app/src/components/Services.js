import {get, post, patch} from 'utils/HTTP';
import LoginActions from '../actions/LoginActions';

const host = (document.location.hostname === 'localhost') ? 'http://localhost:8080' 
    : 'http://dsmc-api.cfapps.io';
const API_CONTEXT = host + '/api/';
const SECURE_API_CONTEXT = API_CONTEXT + 's/';

export default {
    getStudents() {
        return get(SECURE_API_CONTEXT + 'students');
    },
    
    getStudent(id) {
        return get(SECURE_API_CONTEXT + 'students/' + id);
    },
    
    createStudent(student) {
        return post(SECURE_API_CONTEXT + 'students', student);
    },
    
    updateStudent(id, student) {
        return patch(SECURE_API_CONTEXT + 'students/' + id, student);
    },
    
    getInstructors() {
        return get(SECURE_API_CONTEXT + 'instructors');
    },
    
    getInstructor(id) {
        return get(SECURE_API_CONTEXT + 'instructors/' + id);
    },
    
    createInstructor(instructor) {
        return post(SECURE_API_CONTEXT + 'instructors', instructor);
    },
    
    updateInstructor(id, instructor) {
        return patch(SECURE_API_CONTEXT + 'instructors/' + id, instructor);
    },
    
    getPackages() {
        return get(SECURE_API_CONTEXT + 'packages');
    },
    
    getPackage(id) {
        return get(SECURE_API_CONTEXT + 'packages/' + id);
    },
    
    createPackage(pkg) {
        return post(SECURE_API_CONTEXT + 'packages', pkg);
    },
    
    updatePackage(id, pkg) {
        return patch(SECURE_API_CONTEXT + 'packages/' + id, pkg);
    },
    
    getDashboardContent() {
        return get(SECURE_API_CONTEXT + 'dashboard');
    },
    
    login(username, password) {
        return post(API_CONTEXT + 'login', {username, password}).then(function(res) {
            LoginActions.loginUser(res.jwt);
            return true;
        });
    },
    
    logout() {
        LoginActions.logoutUser();
    }
};
