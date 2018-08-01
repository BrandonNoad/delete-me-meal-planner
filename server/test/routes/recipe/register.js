'use strict';

const Hapi = require('hapi');
const { expect, fail } = require('code');

module.exports = ({ describe: context, it }) => () => {

    const { factory } = require('../../../app/routes/Recipe');

    context('when getRoutes throws', () => {

        const getRoutes = (options) => {

            throw new Error('test');
        };

        const plugin = factory(getRoutes);

        it('should cause the server initialization to fail', async () => {

            try {

                const server = Hapi.server();

                await server.register(plugin);

                fail('This should never happen!');
            } catch (err) {

                expect(err).to.exist();
            }
        });
    });

    context('when getRoutes returns an array of routes', () => {

        const getRoutes = (options) => [];

        const plugin = factory(getRoutes);

        it('should not cause the server initialization to fail', async () => {

            const server = Hapi.server();

            await server.register(plugin);
        });
    });
};
