'use strict';

const _has = require('lodash/has');

const makeFactory = catalog => (resource, product) => {

    if (!_has(catalog, [resource, product])) {
        throw new Error(resource + ' ' + product + ' is not in the factory\'s catalog');
    }

    const resourceFactory = catalog[resource];

    // Ensure we only make one instance.
    if (!resourceFactory[product].instance) {
        resourceFactory[product].instance = resourceFactory[product]();
    }

    return resourceFactory[product].instance;
};

const orm = require('../orm');

// Catalog of products that this factory can make.
const catalog = {
    scheduledRecipe: {
        dao() {

            return require('../daos/scheduledRecipeDaoFactory')(orm);
        },
        model() {

            const dao = make('scheduledRecipe', 'dao');

            return require('../models/scheduledRecipeModelFactory')(dao);
        },
        handler() {

            const model = make('scheduledRecipe', 'model');

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
const make = makeFactory(catalog);

// Use this factory to make the various products (daos, models, handlers, etc.) you need in the
// application.
exports.make = make;

// For testing with a stubeed catalog.
exports.makeFactory = makeFactory;
