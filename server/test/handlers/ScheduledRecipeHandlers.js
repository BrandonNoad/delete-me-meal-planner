'use strict';

const Lab = require('lab');
const { before, describe, describe: context, it } = exports.lab = Lab.script();
const { expect, fail } = require('code');

describe('Scheduled Recipe Handlers', () => {

    const scheduledRecipeHandlersFactory = require('../../app/handlers/scheduledRecipeHandlersFactory');

    const ScheduledRecipeModel = {};

    const ScheduledRecipeHandlers = scheduledRecipeHandlersFactory(ScheduledRecipeModel);

    describe('fetchForDate', () => {

        const request = {
            query: {
                date: '2018-07-25'
            }
        };

        context('when the model method succeeds', () => {

            let results;

            before(() => {

                ScheduledRecipeModel.fetchForDate = (date) => Promise.resolve({ results, totalCount: results.length });
            });

            context('and there is at least one recipe scheduled on the given date', () => {

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

                it('should return a promise that is fulfilled with an array of scheduledRecipe objects', async () => {

                    const result = await ScheduledRecipeHandlers.fetchForDate(request);

                    expect(result).to.equal(results);
                });
            });

            context('and there are no recipes scheduled on the given date', () => {

                results = [];

                it('should return a promise that is fulfilled with an empty array', async () => {

                    const result = await ScheduledRecipeHandlers.fetchForDate(request);

                    expect(result).to.equal([]);
                });
            });
        });

        context('when the model method fails', () => {

            before(() => {

                ScheduledRecipeModel.fetchForDate = (date) => Promise.reject(new Error('model method failed!'));
            });

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
