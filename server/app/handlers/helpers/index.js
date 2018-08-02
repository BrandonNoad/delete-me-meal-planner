'use strict';

const { fetchScheduledRecipesPageForDateFactory, fetchRecipesPageFactory,
        fetchSuggestedRecipesFactory } = require('./factories');

exports.fetchScheduledRecipesPageForDate = fetchScheduledRecipesPageForDateFactory(
    require('../../repositories/ScheduledRecipeRepository')
);

exports.fetchRecipesPage = fetchRecipesPageFactory(require('../../repositories/RecipeRepository'));

exports.fetchSuggestedRecipes = fetchSuggestedRecipesFactory(
    require('../../repositories/RecipeRepository')
);
