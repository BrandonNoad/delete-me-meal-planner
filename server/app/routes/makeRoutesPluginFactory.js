'use strict';

const makeRoutesPluginFactory = name => getRoutes => (
    {
        name,
        async register(server, options) {

            // getRoutes() may throw if the options are not configured correctly.
            server.route(getRoutes(server, options));
        }
    }
);

module.exports = makeRoutesPluginFactory;
