import { combineReducers } from 'redux';
import groupedByDate, * as fromGroupedByDate from './groupedByDate';
import dailyMeta, * as fromDailyMeta from './dailyMeta';

const scheduledRecipes = combineReducers({
    groupedByDate,
    dailyMeta
});

export default scheduledRecipes;

export const getScheduledRecipesForDay = (state, moment) => {

    const { groupedByDate } = state;

    const date = moment.format('YYYY-MM-DD');

    return fromGroupedByDate.getScheduledRecipesForDate(groupedByDate, date);
};

export const getDayMeta = (state, moment) => {

    const { dailyMeta } = state;

    const date = moment.format('YYYY-MM-DD');

    return fromDailyMeta.getDayMeta(dailyMeta, date);
};
