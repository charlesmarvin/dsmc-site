module.exports = {
    get(url) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', url);
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
            req.send();
        });
    },
    
    post(url, data) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('POST', url);
            req.responseType = 'json';
            req.setRequestHeader('Content-Type', 'application/json');
            req.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    resolve(req.response);
                } else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function() {
                reject(Error('Network Error'));
            };
            req.send(data);
        });
    },
    
    put(url, data) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('PUT', url);
            req.responseType = 'json';
            req.setRequestHeader('Content-Type', 'application/json');
            req.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    resolve(req.response);
                } else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function() {
                reject(Error('Network Error'));
            };
            req.send(data);
        });
    },
    
    patch(url, data) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('PATCH', url);
            req.responseType = 'json';
            req.setRequestHeader('Content-Type', 'application/json');
            req.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    resolve(req.response);
                } else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function() {
                reject(Error('Network Error'));
            };
            req.send(data);
        });
    },
    
    del(url) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('DELETE', url);
            req.responseType = 'json';
            req.setRequestHeader('Content-Type', 'application/json');
            req.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    resolve(req.response);
                } else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function() {
                reject(Error('Network Error'));
            };
            req.send();
        });
    }
};
