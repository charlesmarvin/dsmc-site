var HTTP = require('utils/HTTP');
var SERVICE_PATH = 'http://dsmc-api.cfapps.io/api/v1/';

module.exports = {
    getStudents() {
        return HTTP.get(SERVICE_PATH + 'students');
    },
    
    getStudent(id) {
        return HTTP.get(SERVICE_PATH + 'students/' + id);
    },
    
    createStudent(student) {
        return HTTP.post(SERVICE_PATH + 'students', student);
    },
    
    updateStudent(id, student) {
        return HTTP.patch(SERVICE_PATH + 'students/' + id, student);
    },
    
    getInstructors() {
        return HTTP.get(SERVICE_PATH + 'instructors');
    },
    
    getInstructor(id) {
        return HTTP.get(SERVICE_PATH + 'instructors/' + id);
    },
    
    createInstructor(instructor) {
        return HTTP.post(SERVICE_PATH + 'instructors', instructor);
    },
    
    updateInstructor(id, instructor) {
        return HTTP.patch(SERVICE_PATH + 'instructors/' + id, instructor);
    },
    
    getPackages() {
        return HTTP.get(SERVICE_PATH + 'packages');
    },
    getPackage(id) {
        return HTTP.get(SERVICE_PATH + 'packages/' + id);
    },
    
    createPackage(pkg) {
        return HTTP.post(SERVICE_PATH + 'packages', pkg);
    },
    
    updatePackage(id, pkg) {
        return HTTP.patch(SERVICE_PATH + 'packages/' + id, pkg);
    }
};
