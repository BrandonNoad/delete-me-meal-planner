'use strict';

const { expect, fail } = require('code');

module.exports = ({ describe: context, afterEach, it }, server) => () => {

    const handler = server.app.testData.scheduledRecipeRoutesOptions
        .handlers.scheduledRecipe.fetchForDatePaginated;

    afterEach(() => {

        handler.resetHistory();
    });

    context('when the date query param is missing', () => {

        const url = '/scheduledRecipes';

        it('should respond with status code 400 Bad Request', async () => {

            const res = await server.inject({ url });

            expect(res.statusCode).to.equal(400);
            expect(res.payload).to.include('"statusCode":400,"error":"Bad Request"');
        });
    });

    context('when the date query param is provided', () => {

        context('and it is a valid date in YYYY-MM-DD format', () => {

            const url = '/scheduledRecipes?date=2018-07-25';

            it('should call the route\'s handler', async () => {

                const res = await server.inject({ url });

                expect(handler.calledOnce).to.be.true();
            });
        });

        context('and it is NOT a valid date in YYYY-MM-DD format', () => {

            const url = '/scheduledRecipes?date=2018/07/25';

            it('should call the route\'s handler', async () => {

                const res = await server.inject({ url });

                expect(res.statusCode).to.equal(400);
                expect(res.payload).to.include('"statusCode":400,"error":"Bad Request"');
            });
        });
    });
};
