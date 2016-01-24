import {
    DASHBOARD_REQUESTED, 
    DASHBOARD_REQUEST_SUCCESS, 
    DASHBOARD_REQUEST_FAILURE
} from 'app/common/AppConstants';
import BaseStore from 'app/common/BaseStore';

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
        this._instructionSessions = [];
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
            this._instructors = action.instructors || [];
            this._instructionSessions = action.instructionSessions || [];
            this.emitChange();
            break;
        case DASHBOARD_REQUEST_FAILURE:
            this._isLoading = false;
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

    get instructionSessions() {
        return this._instructionSessions;
    }
}

export default new DashboardStore();
