import { combineReducers } from 'redux';

export const moment = (state = null, action) => {

    switch (action.type) {

        case 'OPEN_ADD_RECIPES_MODAL':
            return action.moment;

        case 'CLOSE_ADD_RECIPES_MODAL':
            return null;

        default:
            return state;
    }
};

const addRecipesModal = combineReducers({
    moment
});

export default addRecipesModal;
