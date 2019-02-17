import React from 'react';
import { shallow } from 'enzyme';
import MealPlannerApp from './MealPlannerApp';

it('renders without crashing', () => {
    shallow(<MealPlannerApp />);
});
