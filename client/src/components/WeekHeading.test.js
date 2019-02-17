import React from 'react';
import { shallow } from 'enzyme';
import Moment from 'moment';
import WeekHeading from './WeekHeading';

it('renders without crashing', () => {
    shallow(<WeekHeading moment={Moment()} />);
});
