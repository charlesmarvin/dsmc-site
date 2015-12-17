import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {
    SECURE_API_CONTEXT, 
    DASHBOARD_REQUESTED, 
    DASHBOARD_REQUEST_SUCCESS, 
    DASHBOARD_REQUEST_FAILURE
} from '../constants/AppConstants.js';
import {get} from 'utils/JsonFetch';

export default {
    loadDashboardData: () => {
        AppDispatcher.dispatch({
            actionType: DASHBOARD_REQUESTED
        });
        return get(SECURE_API_CONTEXT + 'dashboard')
        .then((data) => {
            console.debug('Dashboard data loaded successfully.');
            AppDispatcher.dispatch({
                actionType: DASHBOARD_REQUEST_SUCCESS,
                ...data
            });
        })
        .catch((e) => {
            console.warn('Failed to load dashboard data. Error: ' + JSON.stringify(e));
            AppDispatcher.dispatch({actionType: DASHBOARD_REQUEST_FAILURE});
        });
    }
};
