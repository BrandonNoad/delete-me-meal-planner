import { combineReducers } from 'redux';
import moment from './moment';
import scheduledRecipes from './scheduledRecipes';

export default combineReducers({
    moment,
    scheduledRecipes
});
