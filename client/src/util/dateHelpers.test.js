import Moment from 'moment';
import { getWeekHeading } from './dateHelpers';

describe('getWeekHeading', () => {

    describe('when Monday and Sunday are in the same month', () => {

        const moment = Moment('2018-07-27');

        it('should return a string in the following format: MMMM YYYY', () => {

            const expectedWeekHeading = 'July 2018';

            const weekHeading = getWeekHeading(moment);

            expect(weekHeading).toBe(expectedWeekHeading);
        });
    });

    describe('when Monday and Sunday are in different months of the same year', () => {

        const moment = Moment('2018-08-01');

        it('should return a string in the following format: MMM – MMM YYYY', () => {

            const expectedWeekHeading = 'Jul – Aug 2018';

            const weekHeading = getWeekHeading(moment);

            expect(weekHeading).toBe(expectedWeekHeading);
        });
    });

    describe('when Monday and Sunday are in different months and years', () => {

        const moment = Moment('2019-01-01');

        it('should return a string in the following format: MMM YYYY – MMM YYYY', () => {

            const expectedWeekHeading = 'Dec 2018 – Jan 2019';

            const weekHeading = getWeekHeading(moment);

            expect(weekHeading).toBe(expectedWeekHeading);
        });
    });
});
