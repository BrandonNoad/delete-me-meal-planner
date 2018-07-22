'use strict';

module.exports = (scheduledRecipeDao) => ({

    // TODO: paginate
    async getForDate(date) {

        const results = await scheduledRecipeDao.getForDate(date);

        return {
            results,
            totalCount: results.length
        };
    }
});
