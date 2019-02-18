import * as api from '../api';
import * as types from './actionTypes';
import { getMetaForDay } from '../reducers/scheduledRecipes';
import { getNextPage, getTotalCount } from '../util/paginationHelpers';
import { FETCH_SCHEDULED_RECIPES_LIMIT } from '../constants';

export const updateMoment = (goto) => ({
    type: types.UPDATE_MOMENT,
    goto
});

export const showModal = (modalType, modalProps) => ({
    type: types.SHOW_MODAL,
    modalType,
    modalProps
});

export const hideModal = () => ({
    type: types.HIDE_MODAL
});

export const fetchScheduledRecipesForDayFactory = ({
    getMetaForDay,
    fetchScheduledRecipesForDay
}) => (moment) => async (dispatch, getState) => {
    const { scheduledRecipes: scheduledRecipesState } = getState();

    // May be undefined.
    const dayMeta = getMetaForDay(scheduledRecipesState, moment);

    const MAX_REQUEST_FAILURES = 3;

    if (
        dayMeta !== undefined &&
        (dayMeta.isFetching || dayMeta.isCache || dayMeta.numFailures >= MAX_REQUEST_FAILURES)
    ) {
        return;
    }

    const date = moment.format('YYYY-MM-DD');

    dispatch({
        type: types.FETCH_SCHEDULED_RECIPES_FOR_DAY_REQUEST,
        date
    });

    try {
        const limit = FETCH_SCHEDULED_RECIPES_LIMIT;

        const queryParams = { date, limit };

        if (dayMeta !== undefined) {
            queryParams.page = dayMeta.nextPage;
        }

        const { headers, data } = await fetchScheduledRecipesForDay(queryParams);

        const nextPage = getNextPage(headers);

        const totalCount = getTotalCount(headers);

        dispatch({
            type: types.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS,
            date,
            data,
            nextPage,
            totalCount
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
    getMetaForDay,
    fetchScheduledRecipesForDay: api.fetchScheduledRecipesForDay
});
