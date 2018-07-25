'use strict';

const Lab = require('lab');
const { before, describe, describe: context, it } = exports.lab = Lab.script();
const { expect, fail } = require('code');

describe('Scheduled Recipe Model', () => {

    const scheduledRecipeModelFactory = require('../../app/models/scheduledRecipeModelFactory');

    const ScheduledRecipeDao = {};

    const ScheduledRecipeModel = scheduledRecipeModelFactory(ScheduledRecipeDao);

    describe('fetchForDate', () => {

        const date = '2018-07-25';

        context('when the data is accessed successfully', () => {

            let results;

            before(() => {

                ScheduledRecipeDao.fetchForDate = (date) => Promise.resolve(results);
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
                        dateScheduled: date
                    }
                ];

                it('should return a promise that is fulfilled with an object that has a an array of scheduledRecipe objects as the results and the length of the results array as the totalCount', async () => {

                    const result = await ScheduledRecipeModel.fetchForDate(date);

                    expect(result).to.equal({
                        results,
                        totalCount: results.length
                    });
                });
            });

            context('and there are no recipes scheduled on the given date', () => {

                results = [];

                it('should return a promise that is fulfilled with an object that has a an empty array as the results and 0 as the totalCount', async () => {

                    const result = await ScheduledRecipeModel.fetchForDate(date);

                    expect(result).to.equal({
                        results: [],
                        totalCount: 0
                    });
                });
            });
        });

        context('when the data access fails', () => {

            before(() => {

                ScheduledRecipeDao.fetchForDate = (date) => Promise.reject(new Error('dao operation failed!'));
            });

            it('should return a promise that is rejected', async () => {

                try {

                    await ScheduledRecipeModel.fetchForDate(date);

                    fail('This should never happen!');

                } catch (err) {

                    expect(err).to.exist().and.to.be.instanceOf(Error);
                }
            });
        });
    });
});
