'use strict';

const { fetchScheduledRecipesForDateFactory } = require('./factories');

// TODO: paginate
exports.fetchScheduledRecipesForDate =
        fetchScheduledRecipesForDateFactory(require('../../repositories/ScheduledRecipeRepository'));
