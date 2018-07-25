'use strict';

const apiFactoryFactory = require('./apiFactoryFactory');

// Catalog of products that apiFactory can make (for production).
const catalog = {
    scheduledRecipe: {
        repository() {

            return require('../repositories/ScheduledRecipeRepository');
        },
        model() {

            const repository = apiFactory('scheduledRecipe', 'repository');

            return require('../domain-models/scheduledRecipeModelFactory')(repository);
        },
        handler() {

            const model = apiFactory('scheduledRecipe', 'model');

            return require('../handlers/scheduledRecipeHandlersFactory')(model);
        }
    }
};

/**
 * Makes the product associated with the given resource. Once a product is made, it is cached to
 * ensure the product is only made once.
 * @param string resource the resource name.
 * @param string product the product name.
 * @return object returns an instance of the product that was asked to be made. May throw an error
 * if the product does not exist in the catalog.
 */
const apiFactory = module.exports = apiFactoryFactory(catalog);
