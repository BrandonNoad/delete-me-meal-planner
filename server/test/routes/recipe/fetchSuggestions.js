'use strict';

const { expect, fail } = require('code');

module.exports = ({ describe: context, afterEach, it }, server) => () => {

    const handler = server.app.testData.recipeRoutesOptions
        .handlers.recipe.fetchSuggestions;

    afterEach(() => {

        handler.resetHistory();
    });

    const url = '/suggestedRecipes';

    it('should call the route\'s handler', async () => {

        const res = await server.inject({ url });

        expect(handler.calledOnce).to.be.true();
    });
};
