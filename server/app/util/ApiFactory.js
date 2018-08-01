'use strict';

const apiFactoryFactory = require('./apiFactoryFactory');

// Catalog of products that apiFactory can make (for production).
const catalog = {
    scheduledRecipe: {
        handler() {

            const helpers = require('../handlers/helpers');

            return require('../handlers/scheduledRecipeHandlersFactory')(helpers);
        }
    },
    recipe: {
        handler() {

            const helpers = require('../handlers/helpers');

            return require('../handlers/recipeHandlersFactory')(helpers);
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
module.exports = apiFactoryFactory(catalog);
