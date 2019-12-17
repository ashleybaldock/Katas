import React, { Component } from 'react';
import formatGbp from './util/formatGbp.js';
import './Goal.css';

class Goal extends Component {
  goalPercentage() {
    return this.props.goal.progress / this.props.goal.target * 100;
  }

  render() {
    const goal = this.props.goal;
    return (
      <div className="Goal">
        <div className="Goal__Completed">
          <div className="Goal__Info">
            <p>Saving for: {goal.description}</p>
            <p>{formatGbp(goal.progress)} of {formatGbp(goal.target)} saved ({this.goalPercentage().toFixed(0)}%)</p>
          </div>
          <div className="Goal__ProgressBar__Outer">
            <div style={{width: this.goalPercentage() + '%'}} className="Goal__ProgressBar__Inner" />
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
