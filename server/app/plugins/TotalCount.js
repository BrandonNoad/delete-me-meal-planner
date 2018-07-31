'use strict';

const _get = require('lodash/get');
const _has = require('lodash/has');
const _isInteger = require('lodash/isInteger');

/**
 * Sets a response header for the total count of the number of resources in the requested
 * collection if the 'totalCount' property is set on the request object and the value is an integer.
 * The default header name is 'X-Total-Count' but may be overridden by setting the
 * 'totalCountHeaderName' property in the plugin options.
 */
const factory = exports.factory = getOnPostHandler => ({

    name: 'total-count',
    async register(server, options) {

        server.ext('onPostHandler', getOnPostHandler(options));
    }
});

// Gets the onPostHandler handler for the total-count plugin.
const getOnPostHandler = exports.getOnPostHandler = options => {

    // Default header name is 'X-Total-Count'.
    const totalCountHeaderName = _get(options, 'totalCountHeaderName', 'X-Total-Count');

    return async (request, h) => {

        // Make sure the total count is an integer.
        if (_has(request.plugins, ['total-count', 'totalCount']) &&
            _isInteger(request.plugins['total-count'].totalCount)) {

            request.response.header(
                totalCountHeaderName,
                request.plugins['total-count'].totalCount
            );
        }

        return h.continue;
    };
};

// Make the plugin by injecting getOnPostHandler.
exports.plugin = factory(getOnPostHandler);
