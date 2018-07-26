'use strict';

const Hapi = require('hapi');
const Sinon = require('sinon');

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const { before, describe } = lab;

describe('scheduled-recipe-routes plugin', () => {

    describe('Plugin registration', require('./register')(lab));

    describe('getRoutes', require('./getRoutes')(lab));

    describe('scheduledRecipe routes', () => {

        const server = Hapi.server({ debug: false });

        const scheduledRecipeRoutesOptions = {
            handlers: {
                scheduledRecipe: {
                    fetchForDate: Sinon.stub().returns('test')
                }
            }
        };

        const { plugin } = require('../../app/routes/ScheduledRecipe');

        const plugins = [
            {
                plugin,
                options: scheduledRecipeRoutesOptions
            }
        ];

        server.app.testData = { scheduledRecipeRoutesOptions };

        before(async () => {

            await server.register(plugins);
        });

        describe('GET /scheduledRecipes?date=YYYY-MM-DD', require('./fetchForDate')(lab, server));
    });
});
