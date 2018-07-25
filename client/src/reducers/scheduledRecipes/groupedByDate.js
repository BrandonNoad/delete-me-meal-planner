import _ from 'lodash';
import { FETCH_SCHEDULED_RECIPES_SUCCESS } from '../../actions';

const groupedByDate = (state = {}, action) => {

    switch (action.type) {

        case FETCH_SCHEDULED_RECIPES_SUCCESS:
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
