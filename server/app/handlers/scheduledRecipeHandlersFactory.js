'use strict';

module.exports = (scheduledRecipeModel) => ({

    async fetchForDate(request, h) {

        const date = request.query.date;

        const { results } = await scheduledRecipeModel.fetchForDate(date);

        return results;
    }
});
