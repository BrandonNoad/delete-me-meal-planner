import React from 'react';
import { Grommet, Box } from 'grommet';
import { hp } from 'grommet-theme-hp';
import WeeklyMealPlanContainer from '../containers/WeeklyMealPlanContainer';
import WeekHeadingContainer from '../containers/WeekHeadingContainer';
import GotoBox from '../components/GotoBox';
import ModalContainer from '../containers/ModalContainer';

const MealPlannerApp = () => (
    <Grommet theme={hp}>
        {/* <Header fixed={true} colorIndex="brand" pad="small">
            <Title>Meal Planner</Title>
        </Header> */}
        <Box pad={{ vertical: 'small', horizontal: 'medium' }}>
            <Box
                direction="row"
                align="baseline"
                margin={{ horizontal: 'none', top: 'none', bottom: 'small' }}
            >
                <GotoBox />
                <WeekHeadingContainer />
            </Box>
            <WeeklyMealPlanContainer />
            <ModalContainer />
        </Box>
        {/* <Footer pad="small" /> */}
    </Grommet>
);

export default MealPlannerApp;
