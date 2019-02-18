import * as actionTypes from '../../actions/actionTypes';

const defaultState = {
    modalType: null,
    modalProps: {}
};

const modal = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_MODAL:
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            };

        case actionTypes.HIDE_MODAL:
            return defaultState;

        default:
            return state;
    }
};

export default modal;
