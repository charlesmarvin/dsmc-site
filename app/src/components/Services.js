var HTTP = require('utils/HTTP');

module.exports = {
    getStudents() {
        return HTTP.get('mockdata/students.json');
    },
    
    getInstructors() {
        return HTTP.get('mockdata/instructors.json');
    },
    
    getPackages() {
        return HTTP.get('mockdata/packages.json');
    }
};
