'use strict';

module.exports = (scheduledRecipeDao) => ({

    // TODO: paginate
    async fetchForDate(date) {

        const results = await scheduledRecipeDao.fetchForDate(date);

        return {
            results,
            totalCount: results.length
        };
    }
});
