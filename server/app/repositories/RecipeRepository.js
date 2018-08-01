'use strict';

const { Recipe } = require('../orm');

const fetchCommon = () => Recipe.query()
    .pick(Recipe, ['id', 'name', 'url']);

exports.fetchPage = async (page, limit) => {

    const result = await fetchCommon()
        .page(page - 1, limit);

    return {
        results: result.results.map(instance => instance.toJSON()),
        totalCount: result.total
    };
};
