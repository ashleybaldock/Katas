import { connect } from 'react-redux';
import { getAuthState } from './selectors';
import PrivateRoute from './PrivateRoute';

const ConnectedPrivateRoute = connect((state, ownProps) => getAuthState(state, ownProps))(PrivateRoute);

export default ConnectedPrivateRoute;
