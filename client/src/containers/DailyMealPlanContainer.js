import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchScheduledRecipesForDay, openAddRecipesModal } from '../actions';
import { getScheduledRecipesForDay, getMetaForDay } from '../reducers/scheduledRecipes';
import DailyMealPlan from '../components/DailyMealPlan';

class DailyMealPlanContainer extends Component {

    fetchData() {

        const { moment, fetchScheduledRecipes } = this.props;

        fetchScheduledRecipes(moment);
    }

    componentDidMount() {

        this.fetchData();
    }

    componentDidUpdate(prevProps) {

        this.fetchData();
    }

    render() {

        const { meta, scheduledRecipes } = this.props;

        // TODO: move the loading indicator inside the tile
        if (meta !== undefined &&
            meta.isFetching &&
            (scheduledRecipes === undefined || !scheduledRecipes.length)) {

            return <p>Loading...</p>;
        }

        // TODO: move the error msg inside the tile
        if (meta !== undefined &&
            meta.errorMessage &&
            (scheduledRecipes === undefined || !scheduledRecipes.length)) {

            return <p>{meta.errorMessage}</p>;
        }

        return <DailyMealPlan  {...this.props} />;
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        scheduledRecipes: getScheduledRecipesForDay(state.scheduledRecipes, ownProps.moment),
        meta: getMetaForDay(state.scheduledRecipes, ownProps.moment)
    }
);

DailyMealPlanContainer = connect(
    mapStateToProps,
    { fetchScheduledRecipes: fetchScheduledRecipesForDay, openAddRecipesModal }
)(DailyMealPlanContainer);

export default DailyMealPlanContainer;
