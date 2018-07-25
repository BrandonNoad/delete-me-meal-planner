'use strict';

module.exports = (ScheduledRecipeDao) => ({

    // TODO: paginate
    async fetchForDate(date) {

        const results = await ScheduledRecipeDao.fetchForDate(date);

        return {
            results,
            totalCount: results.length
        };
    }
});
