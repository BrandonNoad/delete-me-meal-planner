import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchScheduledRecipesForDay } from '../actions';
import { getScheduledRecipesForDay, getDayMeta } from '../reducers/scheduledRecipes';
import DailyMealPlan from '../components/DailyMealPlan';

class DailyMealPlanContainer extends Component {

    fetchData() {

        this.props.fetchScheduledRecipes(this.props.moment);
    }

    componentDidMount() {

        this.fetchData();
    }

    componentDidUpdate(prevProps) {

        this.fetchData();
    }

    render() {

        const { dayMeta, scheduledRecipes } = this.props;

        if (dayMeta !== undefined &&
            dayMeta.isFetching &&
            !scheduledRecipes.length) {

            return <p>Loading...</p>;
        }

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
        dayMeta: getDayMeta(state.scheduledRecipes, ownProps.moment)
    }
);

DailyMealPlanContainer = connect(
    mapStateToProps,
    { fetchScheduledRecipes: fetchScheduledRecipesForDay }
)(DailyMealPlanContainer);

export default DailyMealPlanContainer;
