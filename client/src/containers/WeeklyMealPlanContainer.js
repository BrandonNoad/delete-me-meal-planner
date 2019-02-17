import { connect } from 'react-redux';
import WeeklyMealPlan from '../components/WeeklyMealPlan';

const mapStateToProps = (state) => ({ moment: state.moment });

export default connect(mapStateToProps)(WeeklyMealPlan);
