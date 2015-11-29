import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_SUCCESS, LOGOUT_USER, LOGIN_FAILURE, LOGIN_REQUESTED} from '../constants/LoginConstants.js';
import {API_CONTEXT, JSON_HEADERS} from '../constants/AppConstants.js';
import RouterContainer from '../services/RouterContainer';
import History from 'utils/History';
import {post} from 'utils/JsonFetch';
function navigateOnAuthentication() {
    if (History.state && History.state.nextPathname) {
        History.replaceState(null, History.state.nextPathname);
    } else {
        History.replaceState(null, '/');
    }
}
export default {
    authenticateFromToken: () => {
        var jwt = localStorage.getItem('jwt');
        console.debug('Attempting to authenticate from token.');
        if (jwt) {
            AppDispatcher.dispatch({
                actionType: LOGIN_SUCCESS,
                jwt
            });
            navigateOnAuthentication();
            console.debug('Authenticated from token.');
        }
    },
    loginUser: (username, password) => {
        AppDispatcher.dispatch({
            actionType: LOGIN_REQUESTED
        });
        return post(API_CONTEXT + 'login', {username, password})
        .then((data) => {
            console.debug('User [' + username + '] logged in successfully.');
            var savedJwt = localStorage.getItem('jwt');

            AppDispatcher.dispatch({
                actionType: LOGIN_SUCCESS,
                jwt: data.jwt
            });

            if (savedJwt !== data.jwt) {
                navigateOnAuthentication();
                localStorage.setItem('jwt', data.jwt);
            }
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
        History.push('/login');
        console.debug('Logged out successfully.');
    }
};
