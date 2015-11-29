import {LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_USER, LOGIN_REQUESTED} from '../constants/LoginConstants';
import BaseStore from './BaseStore';


class LoginStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._onAction.bind(this));
        this._jwt = null;
        this._isLoggedIn = false;
        this._loginFailureMsg = '';
        this._isLoading = false;
        this._hasError = false; 
    }

    _onAction(action) {
        switch (action.actionType) {
        case LOGIN_REQUESTED:
            this._isLoading = true;
            this._hasError = false;
            this.emitChange();
            break;
        case LOGIN_SUCCESS:
            this._jwt = action.jwt;
            this._isLoggedIn = !!action.jwt; 
            this._isLoading = false; 
            this._hasError = false;
            this.emitChange();
            break;
        case LOGIN_FAILURE:
            this._loginFailureMsg = action.error;
            this._isLoading = false; 
            this._hasError = true;
            this.emitChange();
            break;
        case LOGOUT_USER:
            this._jwt = null;
            this._isLoggedIn = false;
            this.emitChange();
            break;
        default:
            break;
        };
    }

    get jwt() {
        return this._jwt;
    }

    get isLoggedIn() {
        return this._isLoggedIn;
    }

    get loginErrorMsg() {
        return this._loginFailureMsg;
    }

    get hasError() {
        return this._hasError;
    }

    get isLoading() {
        return this._isLoading;
    }
}

export default new LoginStore();
