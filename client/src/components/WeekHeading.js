import React from 'react';
import { Heading } from 'grommet';

import { getWeekHeading } from '../util/dateHelpers';

const WeekHeading = ({ moment }) => {

    return (
        <Heading strong={true} tag="h3">
            {getWeekHeading(moment)}
        </Heading>
    );
};

export default WeekHeading;
