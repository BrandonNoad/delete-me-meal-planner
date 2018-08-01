import { getNextPage, getTotalCount } from './paginationHelpers';

describe('getNextPage', () => {

    describe('when headers does not contain a "link" header', () => {

        it('should return null', () => {

            const headers = {};

            const result = getNextPage(headers);

            expect(result).toBe(null);
        });
    });

    describe('when headers contains a "link" header but it does not contain rel="next"', () => {

        it('should return null', () => {

            const headers = {
                link: '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=2&page=1>; rel="self", ' +
                '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=2&page=1>; rel="first", ' +
                '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=2&page=2>; rel="last"'
            };

            const result = getNextPage(headers);

            expect(result).toBe(null);
        })
    });

    describe('when headers contains a "link" header and it contains rel="next"', () => {

        it('should return the page number from the rel="next" link (1)', () => {

            const headers = {
                link: '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=2&page=1>; rel="self", ' +
                '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=2&page=1>; rel="first", ' +
                '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=2&page=2>; rel="last", ' +
                '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=2&page=2>; rel="next"'
            };

            const result = getNextPage(headers);

            expect(result).toBe(2);
        });

        it('should return the page number from the rel="next" link (2)', () => {

            const headers = {
                link: '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=10&page=3>; rel="self", ' +
                '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=10&page=1>; rel="first", ' +
                '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=10&page=11>; rel="last", ' +
                '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=10&page=4>; rel="next"'
            };

            const result = getNextPage(headers);

            expect(result).toBe(4);
        });
    });

    describe('when headers contains a "link" header but the rel="next" url does not have a page query param', () => {

        it('should return null', () => {

            const headers = {
                link: '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=2&page=1>; rel="self", ' +
                '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=2&page=1>; rel="first", ' +
                '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=2&page=2>; rel="last", ' +
                '<http://localhost:3001/api/v1.0/scheduledRecipes?date=2018-07-24&limit=2>; rel="next"'
            };

            const result = getNextPage(headers);

            expect(result).toBe(null);
        });
    });
});

describe('getTotalCount', () => {

    describe('when headers does not contain an "x-total-count" header', () => {

        it('should return 0', () => {

            const headers = {};

            const result = getTotalCount(headers);

            expect(result).toBe(0);
        });
    });

    describe('when headers contains an "x-total-count" header', () => {

        it('should return the total count (1)', () => {

            const headers = {
                'x-total-count': '101'
            };

            const result = getTotalCount(headers);

            expect(result).toBe(101);
        });

        it('should return the total count (2)', () => {

            const headers = {
                'x-total-count': '42'
            };

            const result = getTotalCount(headers);

            expect(result).toBe(42);
        });
    });
});
