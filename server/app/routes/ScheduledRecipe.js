'use strict';

const Joi = require('joi');
const makeRoutesPluginFactory = require('./makeRoutesPluginFactory');

const factory = makeRoutesPluginFactory('scheduled-recipe-routes');

exports.factory = factory;

const getRoutes = (server, options) => {

    const optionsSchema = {
        handlers: Joi.object({
            scheduledRecipe: Joi.object().required()
        }).required()
    };

    Joi.assert(
        options,
        optionsSchema,
        new Error('Error registering scheduled-recipe-routes plugin')
    );

    const { fetchForDate } = options.handlers.scheduledRecipe;

    return [
        {
            method: 'GET',
            path: '/scheduledRecipes',
            handler: fetchForDate
        }
    ];
};

// Make the plugin by injecting getRoutes.
const plugin = factory(getRoutes);

exports.plugin = plugin;
