import LoginStore from '../stores/LoginStore';

export default {
    get(url) {
        return send('GET', url);
    },
    
    post(url, data) {
        return send('POST', url, data);
    },
    
    put(url, data) {
        return send('PUT', url, data);
    },
    
    patch(url, data) {
        return send('PATCH', url, data);
    },
    
    del(url) {
        return send('DELETE', url);
    }
};

function send(method, url, data) { 
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(method, url);
        if (method != 'GET') {
            req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        }
        req.setRequestHeader('Authorization', 'Bearer ' + LoginStore.jwt);
        req.responseType = 'json';
        req.onload = function() {
            if (req.status >= 200 && req.status < 400) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function() {
            reject(Error('Network Error'));
        };
        data ? req.send(JSON.stringify(data)) : req.send();
    }); 
}
