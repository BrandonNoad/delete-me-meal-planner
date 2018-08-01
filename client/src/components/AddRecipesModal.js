import React from 'react';
import Layer from 'grommet/components/Layer';

const AddRecipesModal = ({ moment, cancel }) => (

    <Layer hidden={moment === null} closer={true} onClose={cancel}>
        <h2>{(moment === null) ? '' : moment.format('ddd, MMM Do')}</h2>
    </Layer>
);

export default AddRecipesModal;
