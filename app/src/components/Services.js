import {get, post, patch} from 'utils/HTTP';
var SERVICE_PATH = 'http://dsmc-api.cfapps.io/api/v1/';

module.exports = {
    getStudents() {
        return get(SERVICE_PATH + 'students');
    },
    
    getStudent(id) {
        return get(SERVICE_PATH + 'students/' + id);
    },
    
    createStudent(student) {
        return post(SERVICE_PATH + 'students', student);
    },
    
    updateStudent(id, student) {
        return patch(SERVICE_PATH + 'students/' + id, student);
    },
    
    getInstructors() {
        return get(SERVICE_PATH + 'instructors');
    },
    
    getInstructor(id) {
        return get(SERVICE_PATH + 'instructors/' + id);
    },
    
    createInstructor(instructor) {
        return post(SERVICE_PATH + 'instructors', instructor);
    },
    
    updateInstructor(id, instructor) {
        return patch(SERVICE_PATH + 'instructors/' + id, instructor);
    },
    
    getPackages() {
        return get(SERVICE_PATH + 'packages');
    },
    getPackage(id) {
        return get(SERVICE_PATH + 'packages/' + id);
    },
    
    createPackage(pkg) {
        return post(SERVICE_PATH + 'packages', pkg);
    },
    
    updatePackage(id, pkg) {
        return patch(SERVICE_PATH + 'packages/' + id, pkg);
    }
};
