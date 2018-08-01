'use strict';

const { fetchScheduledRecipesPageForDateFactory, fetchRecipesPageFactory } = require('./factories');

exports.fetchScheduledRecipesPageForDate =
        fetchScheduledRecipesPageForDateFactory(require('../../repositories/ScheduledRecipeRepository'));

exports.fetchRecipesPage = fetchRecipesPageFactory(require('../../repositories/RecipeRepository'));
