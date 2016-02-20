import {
    COURSES_REQUESTED,
    COURSES_REQUEST_SUCCESS,
    COURSES_REQUEST_FAILURE
} from './constants';
import BaseStore from 'app/common/BaseStore';

class Store extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._onAction.bind(this));
        this._isLoading = false;
        this._hasError = false; 
        this._courses = [];
    }

    _onAction(action) {
        switch (action.actionType) {
        case COURSES_REQUESTED:
            this._isLoading = true;
            this.emitChange();
            break;
        case COURSES_REQUEST_SUCCESS:
            this._courses = action.courses;
            this._isLoading = false;
            this.emitChange();
            break;
        case COURSES_REQUEST_FAILURE:
            this._isLoading = false;
            this.emitChange();
            break;
        default:
            break;
        }
    }

    get courses() {
        return this._courses;
    }

    get isLoading() {
        return this._isLoading;
    }
}

export default new Store();
