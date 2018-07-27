import { combineReducers } from 'redux';
import groupedByDate, * as fromGroupedByDate from './groupedByDate';
import dailyMeta, * as fromDailyMeta from './dailyMeta';

const scheduledRecipes = combineReducers({
    groupedByDate,
    dailyMeta
});

export default scheduledRecipes;

// export for testing
export const getScheduledRecipesForDayFactory = (getScheduledRecipesForDate) =>
        (state, moment) => {

    const { groupedByDate } = state;

    const date = moment.format('YYYY-MM-DD');

    return getScheduledRecipesForDate(groupedByDate, date);
};

export const getScheduledRecipesForDay =
        getScheduledRecipesForDayFactory(fromGroupedByDate.getScheduledRecipesForDate);

// export for testing
export const getDailyMetaForDayFactory = (getDailyMetaForDate) => (state, moment) => {

    const { dailyMeta } = state;

    const date = moment.format('YYYY-MM-DD');

    return getDailyMetaForDate(dailyMeta, date);
};

export const getDailyMetaForDay = getDailyMetaForDayFactory(fromDailyMeta.getDailyMetaForDate);
