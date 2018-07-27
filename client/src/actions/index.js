import * as api from '../api';
import * as types from './actionTypes';
import { getDailyMetaForDay } from '../reducers/scheduledRecipes';

export const updateMoment = goto => ({

    type: types.UPDATE_MOMENT,
    goto
});

export const fetchScheduledRecipesForDayFactory = ({ getDailyMetaForDay, fetchScheduledRecipesForDay }) =>
        moment => async (dispatch, getState) => {

    const { scheduledRecipes: scheduledRecipesState } = getState();

    // May be undefined.
    const dayMeta = getDailyMetaForDay(scheduledRecipesState, moment);

    const MAX_REQUEST_FAILURES = 3;

    if (dayMeta !== undefined &&
        (dayMeta.isFetching || dayMeta.isCache || dayMeta.numFailures >= MAX_REQUEST_FAILURES)) {

        return;
    }

    const date = moment.format('YYYY-MM-DD');

    dispatch({
        type: types.FETCH_SCHEDULED_RECIPES_FOR_DAY_REQUEST,
        date
    });

    try {

        const { data } = await fetchScheduledRecipesForDay(date);

        dispatch({
            type: types.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS,
            date,
            data
        });
    } catch (err) {

        dispatch({
            type: types.FETCH_SCHEDULED_RECIPES_FOR_DAY_FAILURE,
            date,
            message: err.message || 'Error fetching data!'
        });
    }
};

export const fetchScheduledRecipesForDay = fetchScheduledRecipesForDayFactory({
    getDailyMetaForDay,
    fetchScheduledRecipesForDay: api.fetchScheduledRecipesForDay
});
