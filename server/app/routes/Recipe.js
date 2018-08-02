'use strict';

const JoiDateExtensions = require('joi-date-extensions');
const Joi = require('joi').extend(JoiDateExtensions);

const makeRoutesPluginFactory = require('./makeRoutesPluginFactory');

const factory = exports.factory = makeRoutesPluginFactory('recipe-routes');

const getRoutes = exports.getRoutes = (options) => {

    const optionsSchema = {
        handlers: Joi.object({
            recipe: Joi.object().required()
        }).required(),
        helpers: Joi.object({
            pagination: Joi.object().required()
        }).required()
    };

    Joi.assert(
        options,
        optionsSchema,
        new Error('Error registering recipe-routes plugin')
    );

    const { fetchAllPaginated, fetchSuggestions } = options.handlers.recipe;

    const { queryValidationSchema } = options.helpers.pagination;

    return [
        {
            method: 'GET',
            path: '/recipes',
            handler: fetchAllPaginated,
            options: {
                plugins: {
                    pagination: {
                        enabled: true
                    }
                },
                validate: {
                    query: queryValidationSchema
                }
            }
        },
        {
            method: 'GET',
            path: '/suggestedRecipes',
            handler: fetchSuggestions
        }
    ];
};

// Make the plugin by injecting getRoutes.
exports.plugin = factory(getRoutes);
