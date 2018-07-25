import React from 'react';
import Moment from 'moment';
import { Heading } from 'grommet';

const WeekHeading = ({ moment }) => {

    const getHeading = moment => {

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

    return (
        <Heading strong={true} tag="h3">
            {getHeading(moment)}
        </Heading>
    );
};

export default WeekHeading;
