import { connect } from 'react-redux';
import WeekHeading from '../components/WeekHeading';

const mapStateToProps = state => ({ moment: state.moment });

export default connect(mapStateToProps)(WeekHeading);
