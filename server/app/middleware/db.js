'use strict';

const { Pool } = require('pg');

const { MEAL_PLANNER_DB_HOST, MEAL_PLANNER_DB_USER, MEAL_PLANNER_DB_DATABASE } = process.env;

// https://node-postgres.com/features/connecting
const connectionOptions = {
    host: MEAL_PLANNER_DB_HOST,
    user: MEAL_PLANNER_DB_USER,
    database: MEAL_PLANNER_DB_DATABASE
};

module.exports = new Pool(connectionOptions);
