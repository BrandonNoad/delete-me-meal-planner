import { combineReducers } from 'redux';
import moment from './moment';
import modal from './modal';
import scheduledRecipes from './scheduledRecipes';

export default combineReducers({
    moment,
    modal,
    scheduledRecipes
});
