'use strict';

exports.getRoutes = (server, options) => [
    {
        method: 'GET',
        path: '/scheduledRecipes',
        async handler(request, h) {

            const date = request.query.date;

            // TODO: replace with model fn
            const  getForDate = async (date) => ({ results: [], totalCount: 0 });

            const { results } = await getForDate(date);

            return results;
        }
    }
];
