import Sinon from 'sinon';
import Moment from 'moment';
import { getScheduledRecipesForDayFactory, getDailyMetaForDayFactory } from './index';

const date = '2018-08-01';

const groupedByDate = {
    '2018-07-27': [],
    [date]: [
        {
            id: 42,
            dateScheduled: date,
            recipe: { id: 99, name: 'recipe', url: 'www.recipe.com' }
        },
        {
            id: 43,
            dateScheduled: date,
            recipe: { id: 21, name: 'recipe2', url: 'www.recipe2.com' }
        }
    ]
};

const dailyMeta = {
    '2018-07-27': {
        isFetching: false,
        isCache: true,
        errorMessage: null,
        numFailures: 0
    },
    [date]: {
        isFetching: false,
        isCache: false,
        errorMessage: 'error',
        numFailures: 3
    }
};

const state = { groupedByDate, dailyMeta };

const moment = Moment(date);

describe('getScheduledRecipesForDay selector', () => {

    const getScheduledRecipesForDate = Sinon.spy();

    const getScheduledRecipesForDay = getScheduledRecipesForDayFactory(getScheduledRecipesForDate);

    it('should call the groupedByDate selector with the correct state and date', () => {

        getScheduledRecipesForDay(state, moment);

        expect(getScheduledRecipesForDate.calledWith(groupedByDate, date)).toBe(true);
    });
});

describe('getDailyMetaForDay selector', () => {

    const getDailyMetaForDate = Sinon.spy();

    const getDailyMetaForDay = getDailyMetaForDayFactory(getDailyMetaForDate);

    it('should call the dailyMeta selector with the correct state and date', () => {

        getDailyMetaForDay(state, moment);

        expect(getDailyMetaForDate.calledWith(dailyMeta, date)).toBe(true);
    });
});