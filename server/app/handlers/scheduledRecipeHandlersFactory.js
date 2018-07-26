'use strict';

module.exports = (ScheduledRecipeModel) => ({

    async fetchForDate(request, h) {

        // date query param is required
        const date = request.query.date;

        const { results } = await ScheduledRecipeModel.fetchForDate(date);

        return results;
    }
});
