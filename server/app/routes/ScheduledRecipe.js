'use strict';

const JoiDateExtensions = require('joi-date-extensions');
const Joi = require('joi').extend(JoiDateExtensions);

const makeRoutesPluginFactory = require('./makeRoutesPluginFactory');

const factory = exports.factory = makeRoutesPluginFactory('scheduled-recipe-routes');

const getRoutes = exports.getRoutes = (options) => {

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
            handler: fetchForDate,
            options: {
                validate: {
                    query: {

                        // use .raw() instead of .options({ convert: false })
                        // https://github.com/hapijs/joi/issues/762
                        date: Joi.date().format('YYYY-MM-DD').required().raw()
                    }
                }
            }
        }
    ];
};

// Make the plugin by injecting getRoutes.
exports.plugin = factory(getRoutes);
