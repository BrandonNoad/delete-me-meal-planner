'use strict';

module.exports = catalog => (resource, product) => {

    const _has = require('lodash/has');

    if (!_has(catalog, [resource, product])) {
        throw new Error(`${resource} ${product} is not in the factory's catalog`);
    }

    const resourceFactory = catalog[resource];

    // Ensure we only make one instance.
    if (!resourceFactory[product].instance) {
        resourceFactory[product].instance = resourceFactory[product]();
    }

    return resourceFactory[product].instance;
};
