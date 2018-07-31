'use strict';

exports.fetchScheduledRecipesPageForDateFactory = (ScheduledRecipeRepository) =>
        async (page, limit, date) => ScheduledRecipeRepository.fetchPageForDate(page, limit, date);
