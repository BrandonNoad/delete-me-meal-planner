import React from 'react';
import _ from 'lodash';
import Moment from 'moment';
import { Tiles } from 'grommet';
import DailyMealPlanContainer from '../containers/DailyMealPlanContainer';

const WeeklyMealPlan = ({ moment }) => {

    const dailyMealPlanContainers = _.map(_.range(7), n => {

        // Sets the ISO day of the week with 1 being Monday and 7 being Sunday.
        const dayMoment = Moment(moment).isoWeekday(n + 1);

        return (
            <DailyMealPlanContainer key={n.toString()} moment={dayMoment} />
        );
    });

    return (
        <Tiles justify="around">
            {dailyMealPlanContainers}
        </Tiles>
    );
};

export default WeeklyMealPlan;
