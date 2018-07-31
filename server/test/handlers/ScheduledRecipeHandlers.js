'use strict';

const Lab = require('lab');
const { before, describe, describe: context, it } = exports.lab = Lab.script();
const { expect, fail } = require('code');

describe('Scheduled Recipe Handlers', () => {

    const scheduledRecipeHandlersFactory = require('../../app/handlers/scheduledRecipeHandlersFactory');

    describe('fetchForDatePaginated', () => {

        const request = {
            query: {
                date: '2018-07-25',
                page: 1,
                limit: 10
            },
            plugins: {}
        };

        context('when the helper function succeeds', () => {

            let results;

            let totalCount;

            const fetchScheduledRecipesPageForDate = (page, limit, date) =>
                    Promise.resolve({ results, totalCount });

            const ScheduledRecipeHandlers =
                    scheduledRecipeHandlersFactory({ fetchScheduledRecipesPageForDate });

            context('and there is at least one recipe scheduled on the given date', () => {

                before(() => {

                    results = [
                        {
                            id: 42,
                            recipe: {
                                id: 23,
                                name: 'nom nom',
                                url: 'https://nomnom.com'
                            },
                            dateScheduled: request.query.date
                        }
                    ];

                    totalCount = 101;
                });

                it('should return a promise that is fulfilled with an array of scheduledRecipe objects',
                        async () => {

                    const result = await ScheduledRecipeHandlers.fetchForDatePaginated(request);

                    expect(result).to.equal(results);
                });

                it('should set request.totalCount for the hapi-pagination plugin');

                it('should set request.plugins[\'total-count\'] for the total-count plugin');
            });

            context('and there are no recipes scheduled on the given date', () => {

                before(() => {

                    results = [];

                    totalCount = 0;
                });

                it('should return a promise that is fulfilled with an empty array', async () => {

                    const result = await ScheduledRecipeHandlers.fetchForDatePaginated(request);

                    expect(result).to.equal([]);
                });

                it('should set request.totalCount to 0 for the hapi-pagination plugin');

                it('should set request.plugins[\'total-count\'] to 0 for the total-count plugin');
            });
        });

        context('when the helper function fails', () => {

            const fetchScheduledRecipesForDate = (page, limit, date) =>
                    Promise.reject(new Error('helper function failed!'));

            const ScheduledRecipeHandlers =
                    scheduledRecipeHandlersFactory({ fetchScheduledRecipesForDate });

            it('should return a promise that is rejected', async () => {

                try {

                    await ScheduledRecipeHandlers.fetchForDatePaginated(request);

                    fail('This should never happen!');

                } catch (err) {

                    expect(err).to.exist().and.to.be.instanceOf(Error);
                }
            });
        });
    });
});
