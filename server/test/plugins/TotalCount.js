'use strict';

const Hapi = require('hapi')
const Sinon = require('sinon');
const Lab = require('lab');
const { describe, describe: context, it, afterEach } = exports.lab = Lab.script();
const { expect } = require('code');


describe('total-count plugin', () => {

    const { factory } = require('../../app/plugins/TotalCount');

    describe('Plugin registration', () => {

        context('when getOnPostHandler returns an onPostHandler', () => {

            const getOnPostHandler = options => async (request, h) => h.continue;

            const plugin = factory(getOnPostHandler);

            it('should not cause the server initialization to fail', async () => {

                const server = Hapi.server();

                await server.register(plugin);
            });
        });
    });

    describe('onPostHandler', () => {

        const { getOnPostHandler } = require('../../app/plugins/TotalCount');

        const response = {
            header: Sinon.spy()
        };

        const h = {
            continue: 'toolkit signal'
        };

        afterEach(() => {

            response.header.resetHistory();
        });

        context('when no custom header name was provided', () => {

            const onPostHandler = getOnPostHandler();

            context('and the request is missing the total-count plugin data', () => {

                const request = {
                    plugins: {},
                    response
                };

                it('should not call the response.header function', async () => {

                    await onPostHandler(request, h);

                    expect(response.header.notCalled).to.be.true();
                });

                it('should return h.continue', async () => {

                    const result = await onPostHandler(request, h);

                    expect(result).to.equal(h.continue);
                });
            });

            context('and the request has the total-count plugin data but it is not an integer', () => {

                const request = {
                    plugins: {
                        'total-count': {
                            totalCount: '42'
                        }
                    },
                    response
                };

                it('should not call the response.header function', async () => {

                    await onPostHandler(request, h);

                    expect(response.header.notCalled).to.be.true();
                });

                it('should return h.continue', async () => {

                    const result = await onPostHandler(request, h);

                    expect(result).to.equal(h.continue);
                });
            });

            context('and the request has the total-count plugin data and it is an integer', () => {

                const defaultTotalCountHeaderName = 'X-Total-Count';

                const totalCount = 42;

                const request = {
                    plugins: {
                        'total-count': {
                            totalCount
                        }
                    },
                    response
                };

                it('should call the response.header function with the default header name and totalCount', async () => {

                    await onPostHandler(request, h);

                    expect(response.header.calledWithExactly(defaultTotalCountHeaderName, totalCount)).to.be.true();
                });

                it('should return h.continue', async () => {

                    const result = await onPostHandler(request, h);

                    expect(result).to.equal(h.continue);
                });
            });
        });

        context('when a custom header name was provided', () => {

            const customTotalCountHeaderName = 'X-Custom-Total-Count';

            const onPostHandler = getOnPostHandler({ totalCountHeaderName: customTotalCountHeaderName });

            context('and the request has the total-count plugin data and it is an integer', () => {

                const totalCount = 42;

                const request = {
                    plugins: {
                        'total-count': {
                            totalCount
                        }
                    },
                    response
                };

                it('should call the response.header function with the default header name and totalCount', async () => {

                    await onPostHandler(request, h);

                    expect(response.header.calledWithExactly(customTotalCountHeaderName, totalCount)).to.be.true();
                });

                it('should return h.continue', async () => {

                    const result = await onPostHandler(request, h);

                    expect(result).to.equal(h.continue);
                });
            });
        });
    });
})