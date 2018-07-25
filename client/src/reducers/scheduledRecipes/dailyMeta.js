import _ from 'lodash';
import { combineReducers } from 'redux';
import { FETCH_SCHEDULED_RECIPES_REQUEST, FETCH_SCHEDULED_RECIPES_SUCCESS,
        FETCH_SCHEDULED_RECIPES_FAILURE } from '../../actions';

const dailyMeta = (state = {}, action) => {

    switch (action.type) {

        case FETCH_SCHEDULED_RECIPES_REQUEST:
        case FETCH_SCHEDULED_RECIPES_SUCCESS:
        case FETCH_SCHEDULED_RECIPES_FAILURE:
            return _.assign(
                {},
                state,
                { [action.date]: dayMeta(state[action.date], action) }
            );

        default:
            return state;
    }
};

export default dailyMeta;

const isFetching = (state = false, action) => {

    switch (action.type) {

        case FETCH_SCHEDULED_RECIPES_REQUEST:
            return true;

        case FETCH_SCHEDULED_RECIPES_SUCCESS:
        case FETCH_SCHEDULED_RECIPES_FAILURE:
            return false;

        default:
            return state;
    }
};

const isCache = (state = false, action) => {

    switch (action.type) {

        case FETCH_SCHEDULED_RECIPES_SUCCESS:
            return true;

        default:
            return state;
    }
};

const errorMessage = (state = null, action) => {

    switch (action.type) {

        case FETCH_SCHEDULED_RECIPES_FAILURE:
            return action.message;

        case FETCH_SCHEDULED_RECIPES_REQUEST:
        case FETCH_SCHEDULED_RECIPES_SUCCESS:
            return null;

        default:
            return state;
    }
};

const dayMeta = combineReducers({
    isFetching,
    isCache,
    errorMessage
});

// May be undefined.
export const getDayMeta = (state, date) => state[date];
