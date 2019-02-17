import React from 'react';
import Moment from 'moment';
import { shallow } from 'enzyme';
import AddRecipesModal from './AddRecipesModal';

it('renders without crashing', () => {
    shallow(<AddRecipesModal moment={Moment()} cancel={() => console.log('cancel')} />);
});
