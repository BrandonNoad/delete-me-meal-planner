'use strict';

module.exports = ({ ScheduledRecipe, Recipe }) => {

    const fetchCommon = () => ScheduledRecipe.query()
        .eager('recipe')
        .pick(ScheduledRecipe, ['id', 'dateScheduled', 'recipe'])
        .pick(Recipe, ['id', 'name', 'url']);

    return {
        fetchForDate(date) {

            return fetchCommon().where('date_scheduled', date);
        }
    };
};
