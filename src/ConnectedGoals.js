import { connect } from 'react-redux';
import { updateBalances, updateGoals } from './actions';
import { getGoalsForChildren } from './selectors';
import Goals from './Goals';

export default connect((state, ownProps) => getGoalsForChildren(state, ownProps), {
  onLoad: () => {
    return (dispatch, getState) => {
      updateBalances()(dispatch, getState);
      updateGoals()(dispatch, getState);
    }
  }
})(Goals);
