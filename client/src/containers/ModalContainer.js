import { connect } from 'react-redux';
import { hideModal } from '../actions';
import Modal from '../components/Modal';

export default connect(
    (state) => state.modal,
    { hideModal }
)(Modal);
