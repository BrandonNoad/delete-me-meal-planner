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

const Db = require('../middleware/db');

// Catalog of products that this factory can make.
const catalog = {
    'scheduled-recipe': {
        dao() {

            return require('../daos/scheduled-recipe')(Db);
        },
        model() {

            const dao = make('scheduled-recipe', 'dao');

            return require('../models/scheduled-recipe')(dao);
        },
        handler() {

            const model = make('scheduled-recipe', 'model');

            return require('../handlers/scheduled-recipe')(model);
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
