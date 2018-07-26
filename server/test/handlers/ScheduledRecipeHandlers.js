'use strict';

const Lab = require('lab');
const { before, describe, describe: context, it } = exports.lab = Lab.script();
const { expect, fail } = require('code');

describe('Scheduled Recipe Handlers', () => {

    const scheduledRecipeHandlersFactory = require('../../app/handlers/scheduledRecipeHandlersFactory');

    describe('fetchForDate', () => {

        const request = {
            query: {
                date: '2018-07-25'
            }
        };

        context('when the helper function succeeds', () => {

            let results;

            const fetchScheduledRecipesForDate = (date) =>
                    Promise.resolve({ results, totalCount: results.length });

            const ScheduledRecipeHandlers =
                    scheduledRecipeHandlersFactory({ fetchScheduledRecipesForDate });

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
                });

                it('should return a promise that is fulfilled with an array of scheduledRecipe objects', async () => {

                    const result = await ScheduledRecipeHandlers.fetchForDate(request);

                    expect(result).to.equal(results);
                });
            });

            context('and there are no recipes scheduled on the given date', () => {

                before(() => {

                    results = [];
                });

                it('should return a promise that is fulfilled with an empty array', async () => {

                    const result = await ScheduledRecipeHandlers.fetchForDate(request);

                    expect(result).to.equal([]);
                });
            });
        });

        context('when the helper function fails', () => {

            const fetchScheduledRecipesForDate = (date) =>
                    Promise.reject(new Error('helper function failed!'));

            const ScheduledRecipeHandlers =
                    scheduledRecipeHandlersFactory({ fetchScheduledRecipesForDate });

            it('should return a promise that is rejected', async () => {

                try {

                    await ScheduledRecipeHandlers.fetchForDate(request);

                    fail('This should never happen!');

                } catch (err) {

                    expect(err).to.exist().and.to.be.instanceOf(Error);
                }
            });
        });
    });
});
