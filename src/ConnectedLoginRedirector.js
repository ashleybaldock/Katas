import { connect } from 'react-redux';
import { getAuthState } from './selectors';
import LoginRedirector from './LoginRedirector';

const ConnectedLoginRedirector = connect((state, ownProps) => getAuthState(state, ownProps))(LoginRedirector);

export default ConnectedLoginRedirector;
