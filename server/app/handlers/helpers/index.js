'use strict';

const { fetchScheduledRecipesPageForDateFactory } = require('./factories');

exports.fetchScheduledRecipesPageForDate =
        fetchScheduledRecipesPageForDateFactory(require('../../repositories/ScheduledRecipeRepository'));
