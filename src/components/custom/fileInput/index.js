import { connect } from 'react-redux';

import FileInput from './fileInput';
import compAction from '../../../actions/comparative';

const mapStateToProps = store => ({
});

const mapDispatchToProps = dispatch => ({
  uploadFile: data =>
    dispatch(compAction.uploadFile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileInput);