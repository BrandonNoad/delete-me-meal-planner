'use strict';

exports.fetchScheduledRecipesForDateFactory = (ScheduledRecipeRepository) => async (date) => {

    const results = await ScheduledRecipeRepository.fetchForDate(date);

    return {
        results,
        totalCount: results.length
    };
};
