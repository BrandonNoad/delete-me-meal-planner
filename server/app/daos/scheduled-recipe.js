'use strict';

module.exports = (db) => ({

    async getForDate(date) {

        const sqlString =
            'SELECT scheduled_recipes.*, recipes.name, recipes.url ' +
            'FROM scheduled_recipes ' +
            'LEFT JOIN recipes ON scheduled_recipes.recipe_id = recipes.id ' +
            'WHERE date_scheduled = $1';

        const placeholders = [date];

        const { rows } = await db.query(sqlString, placeholders);

        return rows.map(row => ({
            id: row.id,
            recipe: {
                id: row.recipe_id,
                name: row.name,
                url: row.url
            },
            dateScheduled: row.date_scheduled
        }));
    }
});
