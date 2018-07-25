'use strict';

const { ScheduledRecipe, Recipe } = require('../orm');

const fetchCommon = () => ScheduledRecipe.query()
    .eager('recipe')
    .pick(ScheduledRecipe, ['id', 'dateScheduled', 'recipe'])
    .pick(Recipe, ['id', 'name', 'url']);

exports.fetchForDate = async date => fetchCommon()
    .where('date_scheduled', date)
    .map(instance => instance.toJSON());
