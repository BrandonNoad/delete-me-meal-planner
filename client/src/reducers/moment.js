import Moment from 'moment';
import { UPDATE_MOMENT } from '../actions';

const updateMoment = (state, goto) => {

    switch (goto) {

        case 'today':
            return Moment();

        case 'next-week':
            return Moment(state).add(7, 'days');

        case 'prev-week':
            return Moment(state).subtract(7, 'days');

        default:
            return state;
    }
};

const moment = (state = Moment(), action) => {

    switch (action.type) {

        case UPDATE_MOMENT:
            return updateMoment(state, action.goto);

        default:
            return state;
    }
};

export default moment;
