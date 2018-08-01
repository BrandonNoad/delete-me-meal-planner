import React from 'react';
import { App, Box, Header, Title, Footer } from 'grommet';
import WeeklyMealPlanContainer from '../containers/WeeklyMealPlanContainer';
import WeekHeadingContainer from '../containers/WeekHeadingContainer';
import GotoBox from '../components/GotoBox';
import AddRecipesModalContainer from '../containers/AddRecipesModalContainer';

const MealPlannerApp = () => (

    <App centered={false}>
        <Header fixed={true} colorIndex="brand" pad="small">
            <Title>Meal Planner</Title>
        </Header>
        <Box pad={{ vertical: 'small', horizontal: 'medium' }}>
            <Box direction="row" align="baseline" margin={{ horizontal: 'none', top: 'none', bottom: 'small' }}>
                <GotoBox />
                <WeekHeadingContainer />
            </Box>
            <WeeklyMealPlanContainer />
            <AddRecipesModalContainer />
        </Box>
        <Footer pad="small"></Footer>
    </App>
);

export default MealPlannerApp;
