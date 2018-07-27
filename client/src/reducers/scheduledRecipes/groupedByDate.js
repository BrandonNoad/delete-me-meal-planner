import _ from 'lodash';
import * as actionTypes from '../../actions/actionTypes';

const groupedByDate = (state = {}, action) => {

    switch (action.type) {

        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS:
            return _.assign(
                {},
                state,
                { [action.date]: action.data }
            );

        default:
            return state;
    }
};

export default groupedByDate;

export const getScheduledRecipesForDate = (state, date) => _.get(state, date, []);
