import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';


class LoginStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._jwt = null;
        this._isLoggedIn = false;
    }

    _registerToActions(action) {
        switch (action.actionType) {
        case LOGIN_USER:
            this._jwt = action.jwt;
            this._isLoggedIn = !!action.jwt; 
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
}

export default new LoginStore();
