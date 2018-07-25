'use strict';

module.exports = (ScheduledRecipeRepository) => ({

    // TODO: paginate
    async fetchForDate(date) {

        const results = await ScheduledRecipeRepository.fetchForDate(date);

        return {
            results,
            totalCount: results.length
        };
    }
});
