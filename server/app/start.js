'use strict';

const Server = require('./server');
const Db = require('./middleware/db');

const internals = {};

internals.routeRegistrationOptions = {
    prefix: '/api/v1.0'
};

// manifest specifying the hapi server options, connections, and registrations
internals.manifest = {
    server: {
        host: 'localhost',
        port: 3001,
        router: {
            isCaseSensitive: false,
            stripTrailingSlash: true
        },
        debug: {
            log: ['error', 'info', 'debug'],
            request: ['error', 'info', 'debug']
        }
    },
    register: {
        plugins: [
            { plugin: './routes/scheduled-recipe', routes: internals.routeRegistrationOptions }
        ]
    }
};

internals.composeOptions = {

    // File-system path string that is used to resolve loading modules with require. Used in
    // register.plugins[].
    // __dirname is the name of the directory that the currently executing script resides in
    relativeTo: __dirname
};

// Exit gracefully on various events/signals
internals.exitHandler = function (options, err) {

    if (err) {
        console.log('error', err.stack);
    }

    if (options.cleanUp) {

        // clean up!
        Db.end();
    }

    if (options.exit) {

        // goodbye!
        process.exit();
    }
};

// clean up when app is closing
process.on('exit', internals.exitHandler.bind(null, { cleanUp: true }));

// catches ctrl+c event
process.on('SIGINT', internals.exitHandler.bind(null, { exit: true }));

// catches uncaught exceptions
process.on('uncaughtException', internals.exitHandler.bind(null, { exit: true }));

// the SIGUSR2 signal is used by nodemon to restart
// https://github.com/remy/nodemon#controlling-shutdown-of-your-script
process.once('SIGUSR2', () => {

    internals.exitHandler({ cleanUp: true });
    process.kill(process.pid, 'SIGUSR2');
});

// start the server
(async function startServer() {

    try {

        const server = await Server.init(internals.manifest, internals.composeOptions);

        server.log(['info'], 'Server started at: ' + server.info.uri);

    } catch (err) {

        // server failed to start properly...abort
        console.log('error', 'Server failure: ' + err);

        // clean up!
        internals.exitHandler({ cleanUp: true });
    }
}());
