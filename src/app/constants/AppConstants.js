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
    }
};
