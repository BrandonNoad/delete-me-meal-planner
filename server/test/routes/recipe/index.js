'use strict';

const Hapi = require('hapi');
const Sinon = require('sinon');

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const { before, describe } = lab;

describe('recipe-routes plugin', () => {

    describe('Plugin registration', require('./register')(lab));

    describe('getRoutes', require('./getRoutes')(lab));

    describe('recipe routes', () => {

        const server = Hapi.server({ debug: false });

        const PaginationHelper = require('../../../app/util/PaginationHelper');

        const recipeRoutesOptions = {
            handlers: {
                recipe: {
                    fetchAllPaginated: Sinon.stub().returns('test'),
                    fetchSuggestions: Sinon.stub().returns('test')
                }
            },
            helpers: {
                pagination: PaginationHelper
            }
        };

        const { plugin } = require('../../../app/routes/Recipe');

        const plugins = [
            {
                plugin,
                options: recipeRoutesOptions
            }
        ];

        server.app.testData = { recipeRoutesOptions };

        before(async () => {

            await server.register(plugins);
        });

        describe('GET /recipes', require('./fetchAllPaginated')(lab, server));

        describe('GET /suggestedRecipes', require('./fetchSuggestions')(lab, server));
    });
});
