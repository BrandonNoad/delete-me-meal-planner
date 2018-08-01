'use strict';

exports.fetchScheduledRecipesPageForDateFactory = (ScheduledRecipeRepository) =>
        async (page, limit, date) => ScheduledRecipeRepository.fetchPageForDate(page, limit, date);

exports.fetchRecipesPageFactory = (RecipeRepository) => async (page, limit) =>
        RecipeRepository.fetchPage(page, limit);
