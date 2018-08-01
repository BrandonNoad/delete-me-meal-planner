import Url from 'url';

export const getNextPage = headers => {

    const links = headers.link || '';

    const regex = /<([^\s]+?)>; rel="next"/;

    const result = regex.exec(links);

    if (result === null) {
        return null;
    }

    const queryParams = (Url.parse(result[1], true)).query;

    return (queryParams.page !== undefined) ?
        +(queryParams.page) :
        null;
};

// TODO: use constant for totalCount header name.
export const getTotalCount = headers => (headers['x-total-count'] !== undefined) ?
    +headers['x-total-count'] :
    0;
