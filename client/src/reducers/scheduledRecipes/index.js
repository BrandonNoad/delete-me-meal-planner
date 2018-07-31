import _ from 'lodash';
import { combineReducers } from 'redux';
import * as actionTypes from '../../actions/actionTypes';
import data, * as fromData from './data';
import meta, * as fromMeta from './meta';

const scheduledRecipes = (state = {}, action) => {

    switch (action.type) {

        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_REQUEST:
        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS:
        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_FAILURE:
            return _.assign(
                {},
                state,
                { [action.date]: scheduledRecipesForDate(state[action.date], action) }
            );

        default:
            return state;
    }
};

export default scheduledRecipes;

const scheduledRecipesForDate = combineReducers({
    meta,
    data
});

// export for testing
export const getScheduledRecipesForDayFactory = (getScheduledRecipesForDate) =>
        (state, moment) => {

    const date = moment.format('YYYY-MM-DD');

    // state[date] may be undefined
    return getScheduledRecipesForDate(state[date]);
};

export const getScheduledRecipesForDay =
        getScheduledRecipesForDayFactory(fromData.getScheduledRecipesForDate);

// export for testing
export const getMetaForDayFactory = (getMetaForDate) => (state, moment) => {

    const date = moment.format('YYYY-MM-DD');

    // state[date] may be undefined
    return getMetaForDate(state[date]);
};

export const getMetaForDay = getMetaForDayFactory(fromMeta.getMetaForDate);
