import * as api from '../api';
import { getDayMeta } from '../reducers/scheduledRecipes';

// -- Action Types

export const UPDATE_MOMENT = 'UPDATE MOMENT';
export const FETCH_SCHEDULED_RECIPES_REQUEST = 'FETCH_SCHEDULED_RECIPES_REQUEST';
export const FETCH_SCHEDULED_RECIPES_SUCCESS = 'FETCH_SCHEDULED_RECIPES_SUCCESS';
export const FETCH_SCHEDULED_RECIPES_FAILURE = 'FETCH_SCHEDULED_RECIPES_FAILURE';

// -- Action Creators

export const updateMoment = goto => ({

    type: UPDATE_MOMENT,
    goto
});

export const fetchScheduledRecipesForDay = moment => async (dispatch, getState) => {

    const { scheduledRecipes: scheduledRecipesState } = getState();

    // May be undefined.
    const dayMeta = getDayMeta(scheduledRecipesState, moment);

    if (dayMeta !== undefined && (dayMeta.isFetching || dayMeta.isCache)) {
        return;
    }

    const date = moment.format('YYYY-MM-DD');

    dispatch({
        type: FETCH_SCHEDULED_RECIPES_REQUEST,
        date
    });

    try {

        const { data } = await api.fetchScheduledRecipesForDay(date);

        dispatch({
            type: FETCH_SCHEDULED_RECIPES_SUCCESS,
            date,
            data
        });
    } catch (err) {

        dispatch({
            type: FETCH_SCHEDULED_RECIPES_FAILURE,
            date,
            message: err.message || 'Error fetching data!'
        });
    }
};
