import { connect } from 'react-redux';
import { fetchScheduledRecipesForDay, showModal } from '../actions';
import { getScheduledRecipesForDay, getMetaForDay } from '../reducers/scheduledRecipes';
import DailyMealPlan from '../components/DailyMealPlan';

const mapStateToProps = (state, ownProps) => ({
    scheduledRecipes: getScheduledRecipesForDay(state.scheduledRecipes, ownProps.moment),
    meta: getMetaForDay(state.scheduledRecipes, ownProps.moment)
});

export default connect(
    mapStateToProps,
    { fetchScheduledRecipes: fetchScheduledRecipesForDay, showModal }
)(DailyMealPlan);
