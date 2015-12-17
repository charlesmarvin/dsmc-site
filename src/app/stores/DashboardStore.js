import {
    DASHBOARD_REQUESTED, 
    DASHBOARD_REQUEST_SUCCESS, 
    DASHBOARD_REQUEST_FAILURE
} from '../constants/AppConstants';
import BaseStore from './BaseStore';

class DashboardStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._onAction.bind(this));
        this._isLoading = false;
        this._hasError = false; 
        this._studentsByGenderCount = undefined;
        this._studentsByPackageCount = undefined;
        this._studentsByInstructorCount = undefined;
    }

    _onAction(action) {
        switch (action.actionType) {
        case DASHBOARD_REQUESTED:
            this._isLoading = true;
            this.emitChange();
            break;
        case DASHBOARD_REQUEST_SUCCESS:
            this._isLoading = false;
            this._studentsByGenderCount = action.studentsByGenderCount;
            this._studentsByPackageCount = action.studentsByPackageCount;
            this._studentsByInstructorCount = action.studentsByInstructorCount;
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
}

export default new DashboardStore();
