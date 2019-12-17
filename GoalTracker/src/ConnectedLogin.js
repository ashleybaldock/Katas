import { connect } from 'react-redux';
import { submitLogin } from './actions';
import { getLoginState } from './selectors';
import Login from './Login';

export default connect((state, ownProps) => getLoginState(state, ownProps), {
  handleSubmit: submitLogin
})(Login);

