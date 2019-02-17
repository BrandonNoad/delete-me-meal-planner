import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchScheduledRecipesForDay, openAddRecipesModal } from '../actions';
import { getScheduledRecipesForDay, getMetaForDay } from '../reducers/scheduledRecipes';
import DailyMealPlan from '../components/DailyMealPlan';

const DailyMealPlanContainer = (props) => {
    const { moment, scheduledRecipes, meta, fetchScheduledRecipes } = props;

    useEffect(() => {
        fetchScheduledRecipes(moment);
    }, [moment]);

    // TODO: move the loading indicator inside the tile
    if (
        meta !== undefined &&
        meta.isFetching &&
        (scheduledRecipes === undefined || !scheduledRecipes.length)
    ) {
        return <p>Loading...</p>;
    }

    // TODO: move the error msg inside the tile
    if (
        meta !== undefined &&
        meta.errorMessage &&
        (scheduledRecipes === undefined || !scheduledRecipes.length)
    ) {
        return <p>{meta.errorMessage}</p>;
    }

    return <DailyMealPlan {...props} />;
};

const mapStateToProps = (state, ownProps) => ({
    scheduledRecipes: getScheduledRecipesForDay(state.scheduledRecipes, ownProps.moment),
    meta: getMetaForDay(state.scheduledRecipes, ownProps.moment)
});

export default connect(
    mapStateToProps,
    { fetchScheduledRecipes: fetchScheduledRecipesForDay, openAddRecipesModal }
)(DailyMealPlanContainer);
