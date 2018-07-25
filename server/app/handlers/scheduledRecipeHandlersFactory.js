'use strict';

module.exports = (ScheduledRecipeModel) => ({

    async fetchForDate(request, h) {

        const date = request.query.date;

        const { results } = await ScheduledRecipeModel.fetchForDate(date);

        return results;
    }
});
