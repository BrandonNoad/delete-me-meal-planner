'use strict';

const { expect, fail } = require('code');

module.exports = ({ describe: context, afterEach, it }, server) => () => {

    const handler = server.app.testData.recipeRoutesOptions
        .handlers.recipe.fetchAllPaginated;

    afterEach(() => {

        handler.resetHistory();
    });

    const url = '/recipes';

    it('should call the route\'s handler', async () => {

        const res = await server.inject({ url });

        expect(handler.calledOnce).to.be.true();
    });

    context('when any query params besides page or limit are provided', () => {

        const url = '/recipes?start=100';

        it('should respond with status code 400 Bad Request', async () => {

            const res = await server.inject({ url });

            expect(res.statusCode).to.equal(400);
            expect(res.payload).to.include('"statusCode":400,"error":"Bad Request"');
        });
    });
};
