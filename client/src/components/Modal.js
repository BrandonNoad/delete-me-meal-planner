import React from 'react';

import { Layer } from 'grommet';

import { MODAL_TYPE_ADD_RECIPES } from '../constants';
import AddRecipesModal from './AddRecipesModal';

const modalComponents = {
    [MODAL_TYPE_ADD_RECIPES]: AddRecipesModal
};

const Modal = ({ modalType, modalProps, hideModal }) => {
    if (modalType === null) {
        return null;
    }

    const ModalComponent = modalComponents[modalType];

    return (
        <Layer onEsc={hideModal}>
            <ModalComponent {...modalProps} />
        </Layer>
    );
};

export default Modal;
