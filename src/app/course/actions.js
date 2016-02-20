import AppDispatcher from 'app/common/AppDispatcher.js';
import {
    COURSES_REQUESTED,
    COURSES_REQUEST_SUCCESS,
    COURSES_REQUEST_FAILURE
} from './constants.js';
import {API_CONTEXT} from 'app/common/AppConstants.js';
import {get, post, put} from 'app/common/utils/JsonFetch';

export default {
    loadCourses: () => {
        AppDispatcher.dispatch({
            actionType: COURSES_REQUESTED
        });
        return get(API_CONTEXT + 'courses')
        .then((data) => {
            console.debug('Courses loaded successfully.');
            AppDispatcher.dispatch({
                actionType: COURSES_REQUEST_SUCCESS,
                courses: data
            });
        })
        .catch((e) => {
            console.warn('Failed to load Courses. Error: ' + JSON.stringify(e));
            AppDispatcher.dispatch({actionType: COURSES_REQUEST_FAILURE});
        });
    }
};
