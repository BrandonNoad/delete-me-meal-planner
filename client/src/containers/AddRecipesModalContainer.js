import { connect } from 'react-redux';
import { closeAddRecipesModal } from '../actions';
import AddRecipesModal from '../components/AddRecipesModal';

const mapStateToProps = (state) => state.modals.addRecipesModal;

export default connect(
    mapStateToProps,
    { cancel: closeAddRecipesModal }
)(AddRecipesModal);
