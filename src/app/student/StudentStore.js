import {
    STUDENTS_REQUESTED,
    STUDENTS_REQUEST_SUCCESS,
    STUDENTS_REQUEST_FAILURE
} from './constants';
import BaseStore from 'app/common/BaseStore';

class StudentStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._onAction.bind(this));
        this._isLoading = false;
        this._hasError = false; 
        this._students = [];
    }

    _onAction(action) {
        switch (action.actionType) {
        case STUDENTS_REQUESTED:
            this._isLoading = true;
            this.emitChange();
            break;
        case STUDENTS_REQUEST_SUCCESS:
            this._students = action.students;
            this._isLoading = false;
            this.emitChange();
            break;
        case STUDENTS_REQUEST_FAILURE:
            this._isLoading = false;
            this.emitChange();
            break;
        default:
            break;
        }
    }

    get students() {
        return this._students;
    }

    get isLoading() {
        return this._isLoading;
    }
}

export default new StudentStore();
