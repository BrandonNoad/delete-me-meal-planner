'use strict';

exports.fetchScheduledRecipesPageForDateFactory = (ScheduledRecipeRepository) =>
        (page, limit, date) => ScheduledRecipeRepository.fetchPageForDate(page, limit, date);

exports.fetchRecipesPageFactory = (RecipeRepository) => (page, limit) =>
        RecipeRepository.fetchPage(page, limit);

exports.fetchSuggestedRecipesFactory = (RecipeRepository) => () =>
        RecipeRepository.fetchSuggestions();
