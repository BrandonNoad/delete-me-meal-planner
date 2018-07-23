'use strict';

const Knex = require('knex');
const { Model } = require('objection');

module.exports = (dbConfig) => {

    // Initialize knex.
    const knex = Knex({
        client: 'pg',
        connection: dbConfig
    });

    // Bind all Objection.js Models to the knex instance.
    Model.knex(knex);

    return knex;
};
