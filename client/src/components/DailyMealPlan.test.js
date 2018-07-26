import React from 'react';
import Moment from 'moment';
import { shallow } from 'enzyme';
import DailyMealPlan from './DailyMealPlan';

it('renders without crashing', () => {

    shallow(<DailyMealPlan moment={Moment()} scheduledRecipes={[]} />);
});
