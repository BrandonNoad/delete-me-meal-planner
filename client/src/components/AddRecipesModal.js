import React from 'react';
import { Layer } from 'grommet';

const AddRecipesModal = ({ moment, cancel }) => (
    <Layer onEsc={cancel}>
        <h2>{moment === null ? '' : moment.format('ddd, MMM Do')}</h2>
    </Layer>
);

export default AddRecipesModal;
