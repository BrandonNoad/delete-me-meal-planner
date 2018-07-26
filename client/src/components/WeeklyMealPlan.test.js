import React from 'react';
import { shallow } from 'enzyme';
import Moment from 'moment';
import WeeklyMealPlan from './WeeklyMealPlan';

it('renders without crashing', () => {

    shallow(<WeeklyMealPlan moment={Moment()}/>);
});
