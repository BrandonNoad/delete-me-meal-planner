import _ from 'lodash';
import { combineReducers } from 'redux';
import * as actionTypes from '../../actions/actionTypes';

export const isFetching = (state = false, action) => {

    switch (action.type) {

        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_REQUEST:
            return true;

        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS:
        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_FAILURE:
            return false;

        default:
            return state;
    }
};

export const isCache = (state = false, action) => {

    switch (action.type) {

        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS:
            return true;

        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_REQUEST:
            return false;


        default:
            return state;
    }
};

export const errorMessage = (state = null, action) => {

    switch (action.type) {

        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_FAILURE:
            return action.message;

        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_REQUEST:
        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS:
            return null;

        default:
            return state;
    }
};

export const numFailures = (state = 0, action) => {

    switch (action.type) {

        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_FAILURE:
            return state + 1;

        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS:
            return 0;

        default:
            return state;
    }
};

const meta = combineReducers({
    isFetching,
    isCache,
    errorMessage,
    numFailures
});

export default meta;

// May be undefined (e.g. state is undefined).
export const getMetaForDate = (state) => _.has(state, 'meta') ?
    state.meta :
    state;
