import AppDispatcher from 'app/common/AppDispatcher.js';
import {
    INSTRUCTORS_REQUESTED,
    INSTRUCTORS_REQUEST_SUCCESS,
    INSTRUCTORS_REQUEST_FAILURE
} from './constants.js';
import {API_CONTEXT} from 'app/common/AppConstants.js';
import {get, post, put} from 'app/common/utils/JsonFetch';

export default {
    loadInstructors: () => {
        AppDispatcher.dispatch({
            actionType: INSTRUCTORS_REQUESTED
        });
        return get(API_CONTEXT + 'instructors')
        .then((data) => {
            console.debug('Instructors loaded successfully.');
            AppDispatcher.dispatch({
                actionType: INSTRUCTORS_REQUEST_SUCCESS,
                instructors: data
            });
        })
        .catch((e) => {
            console.warn('Failed to load instructors. Error: ' + JSON.stringify(e));
            AppDispatcher.dispatch({actionType: INSTRUCTORS_REQUEST_FAILURE});
        });
    }
};
