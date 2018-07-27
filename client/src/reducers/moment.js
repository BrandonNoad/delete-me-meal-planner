import Moment from 'moment';
import * as actionTypes from '../actions/actionTypes';

export const updateMomentFactory = (getTodayMoment) => (state, goto) => {

    switch (goto) {

        case 'today':
            return getTodayMoment();

        case 'next-week':
            return Moment(state).add(7, 'days');

        case 'prev-week':
            return Moment(state).subtract(7, 'days');

        default:
            return state;
    }
};

export const momentFactory = (getTodayMoment) => (state = getTodayMoment(), action) => {

    const updateMoment = updateMomentFactory(getTodayMoment);

    switch (action.type) {

        case actionTypes.UPDATE_MOMENT:
            return updateMoment(state, action.goto);

        default:
            return state;
    }
};

export default momentFactory(Moment);
