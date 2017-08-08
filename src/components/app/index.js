import { connect } from 'react-redux';

import AppComponent from './app'
import actionCompare from '../../actions/comparative';

const mapStateToProps = store => ({
  file1: store.comparative.get('file1'),
  file2: store.comparative.get('file2'),
  error: store.comparative.get('error'),
});

const mapDispatchToProps = dispatch => ({
  onChangeTextArea: data =>
    dispatch(actionCompare.onChangeTextArea(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);