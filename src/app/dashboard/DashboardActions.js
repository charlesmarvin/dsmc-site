import _ from 'lodash';
import AppDispatcher from 'app/common/AppDispatcher.js';
import {
    API_CONTEXT, 
    DASHBOARD_REQUESTED, 
    DASHBOARD_REQUEST_SUCCESS, 
    DASHBOARD_REQUEST_FAILURE
} from 'app/common/AppConstants.js';
import {get} from 'app/common/utils/JsonFetch';

export default {
    loadDashboardData: () => {
        AppDispatcher.dispatch({
            actionType: DASHBOARD_REQUESTED
        });
        return get(API_CONTEXT + 'dashboard')
        .then((data) => {
            console.debug('Dashboard data loaded successfully.');
            let event = _.assign({actionType: DASHBOARD_REQUEST_SUCCESS}, data);
            AppDispatcher.dispatch(event);
        })
        .catch((e) => {
            console.warn('Failed to load dashboard data. Error: ' + JSON.stringify(e));
            AppDispatcher.dispatch({actionType: DASHBOARD_REQUEST_FAILURE});
        });
    }
};
