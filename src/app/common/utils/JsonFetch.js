import LoginStore from 'app/auth/LoginStore';
const JSON_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
function handleErrors(response) {
    if (response.status < 200 || response.status >= 400) {
        console.error('Fetch error: ' + JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}
function doFetch(method, url, data = null) {
    var headers = Object.assign({}, JSON_HEADERS);
    if (LoginStore.jwt) {
        Object.assign(headers, {Authorization: 'Bearer ' + LoginStore.jwt});
    }
    var options = {
        method,
        headers,
        mode: 'cors',
        credentials: 'include'
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return fetch(url, options)
    .then(handleErrors)
    .then((response) => response.json());
}
export function get(url) {
    return doFetch('get', url);
}

export function post(url, data) {
    return doFetch('post', url, data);
}

export function put(url, data) {
    return doFetch('put', url, data);
}

export function patch(url, data) {
    return doFetch('patch', url, data);
}

