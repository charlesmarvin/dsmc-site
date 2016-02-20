import {
    INSTRUCTORS_REQUESTED,
    INSTRUCTORS_REQUEST_SUCCESS,
    INSTRUCTORS_REQUEST_FAILURE
} from './constants';
import BaseStore from 'app/common/BaseStore';

class Store extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._onAction.bind(this));
        this._isLoading = false;
        this._hasError = false; 
        this._instructors = [];
    }

    _onAction(action) {
        switch (action.actionType) {
        case INSTRUCTORS_REQUESTED:
            this._isLoading = true;
            this.emitChange();
            break;
        case INSTRUCTORS_REQUEST_SUCCESS:
            this._instructors = action.instructors;
            this._isLoading = false;
            this.emitChange();
            break;
        case INSTRUCTORS_REQUEST_FAILURE:
            this._isLoading = false;
            this.emitChange();
            break;
        default:
            break;
        }
    }

    get instructors() {
        return this._instructors;
    }

    get isLoading() {
        return this._isLoading;
    }
}

export default new Store();
