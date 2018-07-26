'use strict';

module.exports = ({ fetchScheduledRecipesForDate }) => ({

    /**
     * Fetch all scheduledRecipes for the given date.
     *  - GET /scheduledRecipes?date=YYYY-MM-DD
     */
    async fetchForDate(request, h) {

        // date query param is required
        const date = request.query.date;

        const { results } = await fetchScheduledRecipesForDate(date);

        return results;
    }
});
