'use strict';

const Lab = require('lab');
const { before, describe, describe: context, it } = exports.lab = Lab.script();
const { expect, fail } = require('code');

describe('Handler Helpers', () => {

    const { fetchScheduledRecipesPageForDateFactory } =
            require('../../../app/handlers/helpers/factories');

    const ScheduledRecipeRepository = {};

    const fetchScheduledRecipesPageForDate = fetchScheduledRecipesPageForDateFactory(ScheduledRecipeRepository);

    describe('fetchScheduledRecipesPageForDate', () => {

        const page = 11;

        const limit = 10;

        const date = '2018-07-25';

        context('when the data is accessed successfully from the repository', () => {

            let results;

            let totalCount;

            before(() => {

                ScheduledRecipeRepository.fetchPageForDate = (page, limit, date) =>
                        Promise.resolve({ results, totalCount });
            });

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
                            dateScheduled: date
                        }
                    ];

                    totalCount = 101;
                });

                it('should return a promise that is fulfilled with an object that has a an array of scheduledRecipe objects as the results and the total number of results for all pages as the totalCount', async () => {

                    const result = await fetchScheduledRecipesPageForDate(page, limit, date);

                    expect(result).to.equal({ results, totalCount });
                });
            });

            context('and there are no recipes scheduled on the given date', () => {

                const page = 1;

                before(() => {

                    results = [];

                    totalCount = 0;
                });

                it('should return a promise that is fulfilled with an object that has a an empty array as the results and 0 as the totalCount', async () => {

                    const result = await fetchScheduledRecipesPageForDate(page, limit, date);

                    expect(result).to.equal({ results, totalCount });
                });
            });
        });

        context('when the data access fails', () => {

            before(() => {

                ScheduledRecipeRepository.fetchForDate = (page, limit, date) =>
                        Promise.reject(new Error('repository operation failed!'));
            });

            it('should return a promise that is rejected', async () => {

                try {

                    await fetchScheduledRecipesPageForDate(page, limit, date);

                    fail('This should never happen!');

                } catch (err) {

                    expect(err).to.exist().and.to.be.instanceOf(Error);
                }
            });
        });
    });
});
