import AppDispatcher from 'app/common/AppDispatcher.js';
import {
    LOGIN_SUCCESS, 
    LOGOUT_USER, 
    LOGIN_FAILURE, 
    LOGIN_REQUESTED,
    TOKEN_LOGIN_SUCCESS, 
    TOKEN_LOGIN_FAILURE, 
    TOKEN_LOGIN_REQUESTED
} from './LoginConstants.js';
import {API_CONTEXT} from 'app/common/AppConstants.js';
import history from 'app/common/utils/History';
import {get, post} from 'app/common/utils/JsonFetch';

export default {
    authenticateFromToken: () => {
        console.debug('Attempting to authenticate from token.');
        var jwt = localStorage.getItem('jwt');
        if (jwt) {
            AppDispatcher.dispatch({
                actionType: TOKEN_LOGIN_REQUESTED,
                jwt
            });
            return get(API_CONTEXT + 'auth/token')
            .then((data) => {
                AppDispatcher.dispatch({
                    actionType: TOKEN_LOGIN_SUCCESS,
                    jwt
                });
                history.replaceState(null, '/');
            })
            .catch((e) => {
                console.warn('Could not authenticate from token. Error: ' + JSON.stringify(e));
                AppDispatcher.dispatch({
                    actionType: TOKEN_LOGIN_FAILURE
                });
                history.replaceState(null, '/login');
            });
            console.debug('Authenticated from token.');
        }
    },
    loginUser: (username, password) => {
        AppDispatcher.dispatch({
            actionType: LOGIN_REQUESTED
        });
        return post(API_CONTEXT + 'auth/login', {username, password})
        .then((data) => {
            console.debug('User [' + username + '] logged in successfully. ' + JSON.stringify(data));
            localStorage.setItem('jwt', data.jwt);
            console.debug('updated token');
            AppDispatcher.dispatch({
                actionType: LOGIN_SUCCESS,
                jwt: data.jwt
            });
            history.replaceState(null, '/');
        })
        .catch((e) => {
            console.warn('User [' + username + '] loggin failed. Error: ' + JSON.stringify(e));
            AppDispatcher.dispatch({actionType: LOGIN_FAILURE});
        });
    },
    logoutUser: () => {
        localStorage.removeItem('jwt');
        AppDispatcher.dispatch({
            actionType: LOGOUT_USER
        });
        history.push('/login');
        console.debug('Logged out successfully.');
    }
};
