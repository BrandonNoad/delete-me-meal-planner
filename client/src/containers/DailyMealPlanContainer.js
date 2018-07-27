import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchScheduledRecipesForDay } from '../actions';
import { getScheduledRecipesForDay, getDailyMetaForDay } from '../reducers/scheduledRecipes';
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

        const { dayMeta, scheduledRecipes } = this.props;

        // TODO: move the loading indicator inside the tile
        if (dayMeta !== undefined &&
            dayMeta.isFetching &&
            !scheduledRecipes.length) {

            return <p>Loading...</p>;
        }

        // TODO: move the error msg inside the tile
        if (dayMeta !== undefined &&
            dayMeta.errorMessage &&
            !scheduledRecipes.length) {

            return <p>{dayMeta.errorMessage}</p>;
        }

        return <DailyMealPlan  {...this.props} />;
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        scheduledRecipes: getScheduledRecipesForDay(state.scheduledRecipes, ownProps.moment),
        dayMeta: getDailyMetaForDay(state.scheduledRecipes, ownProps.moment)
    }
);

DailyMealPlanContainer = connect(
    mapStateToProps,
    { fetchScheduledRecipes: fetchScheduledRecipesForDay }
)(DailyMealPlanContainer);

export default DailyMealPlanContainer;
