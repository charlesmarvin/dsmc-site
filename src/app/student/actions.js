import AppDispatcher from 'app/common/AppDispatcher.js';
import {
    STUDENTS_REQUESTED,
    STUDENTS_REQUEST_SUCCESS,
    STUDENTS_REQUEST_FAILURE
} from './constants.js';
import {API_CONTEXT} from 'app/common/AppConstants.js';
import {get, post, put} from 'app/common/utils/JsonFetch';

export default {
    loadStudents: () => {
        AppDispatcher.dispatch({
            actionType: STUDENTS_REQUESTED
        });
        return get(API_CONTEXT + 'students')
        .then((data) => {
            console.debug('Students loaded successfully.');
            AppDispatcher.dispatch({
                actionType: STUDENTS_REQUEST_SUCCESS,
                students: data
            });
        })
        .catch((e) => {
            console.warn('Failed to load students. Error: ' + JSON.stringify(e));
            AppDispatcher.dispatch({actionType: STUDENTS_REQUEST_FAILURE});
        });
    }
};
