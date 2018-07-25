import React from 'react';
import GotoButton from '../containers/GotoButton';
import { Box } from 'grommet';

const GotoBox = () => (

    <Box direction="row" responsive={false}>
        <GotoButton goto="prev-week" plain={true} label={<span className="fas fa-angle-left"></span>} />
        <GotoButton goto="today" accent={true} label="TODAY" />
        <GotoButton goto="next-week" plain={true} label={<span className="fas fa-angle-right"></span>} />
    </Box>
);

export default GotoBox;
