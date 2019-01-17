import React, { Component } from 'react';
import formatGbp from './util/formatGbp.js';
import './Goal.css';

class Goal extends Component {
  render() {
    const goal = this.props.goal;
    return (
      <div className="Goal">
        <div className="Goal__Completed">
          <div className="Goal__Info">
            <p>Saving for: {goal.description}</p>
            <p>{formatGbp(goal.progress * goal.target)} of {formatGbp(goal.target)} saved ({goal.progress * 100}%)</p>
          </div>
          <div className="Goal__ProgressBar__Outer">
            <div style={{width: goal.progress * 100 + '%'}} className="Goal__ProgressBar__Inner" />
          </div>
        </div>
        <div className="Goal__Image">
          <img src={goal.image} alt="" />
        </div>
      </div>
    );
  }
}

export default Goal;
