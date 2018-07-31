import _ from 'lodash';
import * as actionTypes from '../../actions/actionTypes';

const data = (state = [], action) => {

    switch (action.type) {

        case actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS:
            return action.data;

        default:
            return state;
    }
};

export default data;

// May be undefined (e.g state is undefined).
// TODO: return [] when state is undefined??
export const getScheduledRecipesForDate = (state) => _.has(state, 'data') ?
    state.data :
    state;
