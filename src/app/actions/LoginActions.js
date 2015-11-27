import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';
import RouterContainer from '../services/RouterContainer';
import History from '../utils/History';

export default {
    loginUser: (jwt) => {
        var savedJwt = localStorage.getItem('jwt');

        AppDispatcher.dispatch({
            actionType: LOGIN_USER,
            jwt
        });

        if (savedJwt !== jwt) {
            if (History.state && History.state.nextPathname) {
                History.replaceState(null, History.state.nextPathname);
            } else {
                History.replaceState(null, '/');
            }
            localStorage.setItem('jwt', jwt);
        }
    },
    logoutUser: () => {
        localStorage.removeItem('jwt');
        AppDispatcher.dispatch({
            actionType: LOGOUT_USER
        });
        History.push('/login');
    }
};
