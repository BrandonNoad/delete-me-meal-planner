'use strict';

module.exports = (scheduledRecipeModel) => ({

    async getForDate(request, h) {

        const date = request.query.date;

        const { results } = await scheduledRecipeModel.getForDate(date);

        return results;
    }
});
