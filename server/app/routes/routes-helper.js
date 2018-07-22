'use strict';

exports.makePluginFactory = name => helper => (
    {
        name,
        async register(server, options) {

            // helper.getRoutes() may throw if the options are not configured correctly.
            server.route(helper.getRoutes(server, options));
        }
    }
);
