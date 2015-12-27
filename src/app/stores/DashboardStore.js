import {
    DASHBOARD_REQUESTED, 
    DASHBOARD_REQUEST_SUCCESS, 
    DASHBOARD_REQUEST_FAILURE,
    STUDENTS_REQUEST_SUCCESS,
    STUDENTS_REQUEST_FAILURE,
    INSTRUCTORS_REQUEST_SUCCESS,
    INSTRUCTORS_REQUEST_FAILURE
} from '../constants/AppConstants';
import BaseStore from './BaseStore';

class DashboardStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._onAction.bind(this));
        this._isLoading = false;
        this._hasError = false; 
        this._studentsByGenderCount = {};
        this._studentsByPackageCount = {};
        this._studentsByInstructorCount = {};
        this._students = [];
        this._instructors = [];
    }

    _onAction(action) {
        switch (action.actionType) {
        case DASHBOARD_REQUESTED:
            this._isLoading = true;
            this.emitChange();
            break;
        case DASHBOARD_REQUEST_SUCCESS:
            this._isLoading = false;
            this._studentsByGenderCount = action.studentsByGenderCount || {};
            this._studentsByPackageCount = action.studentsByPackageCount || {};
            this._studentsByInstructorCount = action.studentsByInstructorCount || {};
            this._students = action.students || [];
            this.emitChange();
            break;
        case DASHBOARD_REQUEST_FAILURE:
            this._isLoading = false;
            this.emitChange();
            break;
        case STUDENTS_REQUEST_SUCCESS:
            this._students = action.students;
            this.emitChange();
            break;
        case STUDENTS_REQUEST_FAILURE:
            this.emitChange();
            break;
        case INSTRUCTORS_REQUEST_SUCCESS:
            this._instructors = action.instructors;
            this.emitChange();
            break;
        case INSTRUCTORS_REQUEST_FAILURE:
            this.emitChange();
            break;
        default:
            break;
        }
    }

    get studentsByGenderCount() {
        return this._studentsByGenderCount;
    }

    get studentsByPackageCount() {
        return this._studentsByPackageCount;
    }

    get studentsByInstructorCount() {
        return this._studentsByInstructorCount;
    }

    get students() {
        return this._students;
    }

    get instructors() {
        return this._instructors;
    }
}

export default new DashboardStore();
