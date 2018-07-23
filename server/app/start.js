'use strict';

const Server = require('./server');
const ApiFactory = require('./util/ApiFactory');
const orm = require('./orm');

// Initialize the ORM.
orm.init();

const routeRegistrationOptions = { prefix: '/api/v1.0' };

const pluginOptions = {
    routes: {
        scheduledRecipe: {
           handlers: {
               scheduledRecipe: ApiFactory.make('scheduledRecipe', 'handler')
           }
        }
    }
};

// manifest specifying the hapi server options, connections, and registrations
const manifest = {
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
            {
                plugin: './routes/ScheduledRecipe',
                options: pluginOptions.routes.scheduledRecipe,
                routes: routeRegistrationOptions
            }
        ]
    }
};

const composeOptions = {

    // File-system path string that is used to resolve loading modules with require. Used in
    // register.plugins[].
    // __dirname is the name of the directory that the currently executing script resides in
    relativeTo: __dirname
};

// Exit gracefully on various events/signals
const exitHandler = (options, err) => {

    if (err) {
        console.log('error', err.stack);
    }

    if (options.cleanUp) {

        // clean up!
        // Db.end();
    }

    if (options.exit) {

        // goodbye!
        process.exit();
    }
};

// clean up when app is closing
process.on('exit', exitHandler.bind(null, { cleanUp: true }));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

// the SIGUSR2 signal is used by nodemon to restart
// https://github.com/remy/nodemon#controlling-shutdown-of-your-script
process.once('SIGUSR2', () => {

    exitHandler({ cleanUp: true });
    process.kill(process.pid, 'SIGUSR2');
});

// Start the server
(async function startServer() {

    try {

        const server = await Server.init(manifest, composeOptions);

        server.log(['info'], 'Server started at: ' + server.info.uri);

    } catch (err) {

        // server failed to start properly...abort
        console.log('error', 'Server failure: ' + err);

        // clean up!
        exitHandler({ cleanUp: true });
    }
}());
