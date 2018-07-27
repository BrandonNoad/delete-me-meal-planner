import Moment from 'moment';

// Returns a string in 3 different formats depending on whether Monday and Sudnay are in the same
// month/year:
// 1. July 2018
// 2. Jul – Aug 2018
// 3. Dec 2018 – Jan 2019
export const getWeekHeading = moment => {

    // Monday
    const mondayMoment = Moment(moment).isoWeekday(1);
    const mondayMonth = mondayMoment.month();
    const mondayYear = mondayMoment.year();

    // Sunday
    const sundayMoment = Moment(moment).isoWeekday(7);
    const sundayMonth = sundayMoment.month();
    const sundayYear = sundayMoment.year();

    if (mondayMonth === sundayMonth) {
        return mondayMoment.format('MMMM') + ' ' + mondayMoment.format('YYYY');
    }

    if (mondayYear === sundayYear) {
        return mondayMoment.format('MMM') + ' – ' + sundayMoment.format('MMM') + ' ' +
                mondayMoment.format('YYYY');
    }

    return mondayMoment.format('MMM') + ' ' + mondayMoment.format('YYYY') + ' – ' +
            sundayMoment.format('MMM') + ' ' + sundayMoment.format('YYYY');
};
