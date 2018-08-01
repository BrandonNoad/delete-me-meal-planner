'use strict';

const Lab = require('lab');
const { before, beforeEach, describe, describe: context, it } = exports.lab = Lab.script();
const { expect, fail } = require('code');

describe('Recipe Handlers', () => {

    const recipeHandlersFactory = require('../../app/handlers/recipeHandlersFactory');

    describe('fetchAllPaginated', () => {

        const request = {
            query: {
                page: 1,
                limit: 10
            },
            plugins: {}
        };

        context('when the helper function succeeds', () => {

            let results;

            let totalCount;

            const fetchRecipesPage = (page, limit) => Promise.resolve({ results, totalCount });

            const RecipeHandlers = recipeHandlersFactory({ fetchRecipesPage });

            beforeEach(() => {

                delete request.totalCount;

                delete request.plugins['total-count'];
            });

            context('and there is at least one recipe', () => {

                before(() => {

                    results = [
                        {
                            id: 23,
                            name: 'nom nom',
                            url: 'https://nomnom.com'
                        }
                    ];

                    totalCount = 101;
                });

                it('should return a promise that is fulfilled with an array of recipe objects',
                        async () => {

                    const result = await RecipeHandlers.fetchAllPaginated(request);

                    expect(result).to.equal(results);
                });

                it('should set request.totalCount for the hapi-pagination plugin', async () => {

                    const result = await RecipeHandlers.fetchAllPaginated(request);

                    expect(request.totalCount).to.equal(totalCount);
                });

                it('should set request.plugins[\'total-count\'] for the total-count plugin', async () => {

                    const result = await RecipeHandlers.fetchAllPaginated(request);

                    expect(request.plugins['total-count']).to.equal({ totalCount });
                });
            });

            context('and there are no recipes', () => {

                before(() => {

                    results = [];

                    totalCount = 0;
                });

                it('should return a promise that is fulfilled with an empty array', async () => {

                    const result = await RecipeHandlers.fetchAllPaginated(request);

                    expect(result).to.equal([]);
                });

                it('should set request.totalCount to 0 for the hapi-pagination plugin', async () => {

                    const result = await RecipeHandlers.fetchAllPaginated(request);

                    expect(request.totalCount).to.equal(totalCount);
                });

                it('should set request.plugins[\'total-count\'] to 0 for the total-count plugin', async () => {

                    const result = await RecipeHandlers.fetchAllPaginated(request);

                    expect(request.plugins['total-count']).to.equal({ totalCount });
                });
            });
        });

        context('when the helper function fails', () => {

            const fetchRecipesPage = (page, limit) =>
                    Promise.reject(new Error('helper function failed!'));

            const RecipeHandlers = recipeHandlersFactory({ fetchRecipesPage });

            it('should return a promise that is rejected', async () => {

                try {

                    await RecipeHandlers.fetchFAllPaginated(request);

                    fail('This should never happen!');

                } catch (err) {

                    expect(err).to.exist().and.to.be.instanceOf(Error);
                }
            });
        });
    });
});
