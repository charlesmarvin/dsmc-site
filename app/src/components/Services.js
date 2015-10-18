var HTTP = require('utils/HTTP');

module.exports = {
    getStudents() {
        return HTTP.get('http://dsmc-api.cfapps.io/api/v1/students');
    },
    
    getInstructors() {
        return HTTP.get('http://dsmc-api.cfapps.io/api/v1/instructors');
    },
    
    getPackages() {
        return HTTP.get('http://dsmc-api.cfapps.io/api/v1/packages');
    }
};
