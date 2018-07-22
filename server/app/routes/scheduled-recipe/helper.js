'use strict';

const Joi = require('joi');

exports.getRoutes = (server, options) => {

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

    const { getForDate } = options.handlers.scheduledRecipe;

    return [
        {
            method: 'GET',
            path: '/scheduledRecipes',
            handler: getForDate
        }
    ];
};
