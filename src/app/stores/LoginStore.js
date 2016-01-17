import {
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    LOGOUT_USER, 
    LOGIN_REQUESTED,
    TOKEN_LOGIN_SUCCESS, 
    TOKEN_LOGIN_FAILURE, 
    TOKEN_LOGIN_REQUESTED
} from '../constants/LoginConstants';
import BaseStore from './BaseStore';


class LoginStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._onAction.bind(this));
        this._jwt = null;
        this._loginFailureMsg = '';
        this._isLoading = false;
        this._hasError = false; 
        this._tokenLogin = false;
    }

    _onAction(action) {
        switch (action.actionType) {
        case LOGIN_REQUESTED:
        case TOKEN_LOGIN_REQUESTED:
            this._isLoading = true;
            this._hasError = false;
            this._tokenLogin = this._isTokenLogin(action.actionType);
            this._jwt = this._isTokenLogin(action.actionType) ? action.jwt : null;
            this.emitChange();
            break;
        case LOGIN_SUCCESS:
        case TOKEN_LOGIN_SUCCESS:
            this._jwt = action.jwt;
            this._isLoading = false; 
            this._hasError = false;
            this._tokenLogin = this._isTokenLogin(action.actionType);
            this.emitChange();
            break;
        case LOGIN_FAILURE:
        case TOKEN_LOGIN_FAILURE:
            this._loginFailureMsg = action.error;
            this._isLoading = false; 
            this._hasError = true;
            this._tokenLogin = this._isTokenLogin(action.actionType);
            this.emitChange();
            break;
        case LOGOUT_USER:
            this._jwt = null;
            this.emitChange();
            break;
        default:
            break;
        };
    }

    _isTokenLogin(action) {
        let tokenActions = [TOKEN_LOGIN_SUCCESS, TOKEN_LOGIN_FAILURE, TOKEN_LOGIN_REQUESTED];
        return tokenActions.indexOf(action) !== -1; 
    }

    get jwt() {
        return this._jwt;
    }

    get isLoggedIn() {
        return !!this._jwt;
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

    get isTokenLogin() {
        return this._tokenLogin;
    }
}

export default new LoginStore();
