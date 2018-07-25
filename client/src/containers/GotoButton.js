import { connect } from 'react-redux';
import { Button } from 'grommet';
import { updateMoment } from '../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({

    onClick: () => dispatch(updateMoment(ownProps.goto))
});

export default connect(undefined, mapDispatchToProps)(Button);
