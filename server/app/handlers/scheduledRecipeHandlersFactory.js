'use strict';

module.exports = ({ fetchScheduledRecipesPageForDate }) => ({

    /**
     * Fetch all scheduledRecipes for the given date paginated.
     *  - GET /scheduledRecipes?date=YYYY-MM-DD
     */
    async fetchForDatePaginated(request, h) {

        // page and limit are not required but have default values
        // date query param is required
        const { page, limit, date } = request.query;

        const { results, totalCount } = await fetchScheduledRecipesPageForDate(page, limit, date);

        // Set the total count for the hapi-pagination plugin.
        request.totalCount = totalCount;

        // Set the total count for the total-count plugin.
        request.plugins['total-count'] = {
            totalCount: totalCount
        };

        return results;
    }
});
