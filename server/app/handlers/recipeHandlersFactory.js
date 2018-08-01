'use strict';

module.exports = ({ fetchRecipesPage }) => ({

    /**
     * Fetch all recipes paginated.
     *  - GET /recipes
     */
    async fetchAllPaginated(request, h) {

        // page and limit are not required but have default values
        const { page, limit } = request.query;

        const { results, totalCount } = await fetchRecipesPage(page, limit);

        // Set the total count for the hapi-pagination plugin.
        request.totalCount = totalCount;

        // Set the total count for the total-count plugin.
        request.plugins['total-count'] = {
            totalCount: totalCount
        };

        return results;
    }
});
