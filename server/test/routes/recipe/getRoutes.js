'use strict';

const _ = require('lodash');
const { expect, fail } = require('code');

module.exports = ({ describe: context, it }) => () => {

    const { getRoutes } = require('../../../app/routes/Recipe');

    const options = {
        handlers: {
            recipe: {}
        },
        helpers: {
            pagination: {}
        }
    };

    context('when the options are missing the recipes handler', () => {

        it('should throw an Error', async () => {

            try {

                getRoutes(_.omit(options, 'handlers.recipe'));

                fail('This should never happen!');
            } catch (err) {

                expect(err).to.exist();
            }
        });
    });

    context('when the options are missing the pagination helper', () => {

        it('should throw an Error', async () => {

            try {

                getRoutes(_.omit(options, 'helpers.pagination'));

                fail('This should never happen!');
            } catch (err) {

                expect(err).to.exist();
            }
        });
    });

    context('when the options are valid', function () {

        it('should return an array of routes', async () => {

            const routes = getRoutes(options);

            expect(routes).to.be.an.array();
        });
    });
};
