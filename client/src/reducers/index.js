import { combineReducers } from 'redux';
import moment from './moment';
import modals from './modals';
import scheduledRecipes from './scheduledRecipes';

export default combineReducers({
    moment,
    modals,
    scheduledRecipes
});
