import React, { Component } from 'react';
import './Goals.css';

class Goals extends Component {
  componentWillMount() {
    console.log('goals mount');
    this.props.onLoad();
  }
  componentWillUnmount() {
    console.log('goals unmount');
  }

  formatGbp(amount) {
    return new Intl.NumberFormat('en-GB', { 
      style: 'currency', 
      currency: 'GBP' 
    }).format(amount);
  }

  renderGoal(goal) {
    return (
      <div className="Goal">
        <div className="Goal__Completed">
          <div className="Goal__Info">
            <p>Saving for: {goal.description}</p>
            <p>{this.formatGbp(goal.progress * goal.goalTotal)} of {this.formatGbp(goal.goalTotal)} saved ({goal.progress * 100}%)</p>
          </div>
          <div className="Goal__ProgressBar__Outer">
            <div style={{width: goal.progress * 100 + '%'}} className="Goal__ProgressBar__Inner" />
          </div>
        </div>
        <div className="Goal__Image">
          <img src="https://legacy.roostermoney.com/images/googleimages/526255-76dcd13e-86fc-4e23-9d4c-975429f50ed9.jpg" alt="" />
        </div>
      </div>
    );
  }

  renderChildGoals(childGoals) {
    return (
      <div className="ChildGoals">
        <h1 className="ChildGoals__ChildName">{childGoals.username}&#39;s saving goals</h1>
        <p className="ChildGoals__GoalsTotal">{childGoals.username} has {this.formatGbp(childGoals.goalsTotal)} saved toward their goals, and {this.formatGbp(childGoals.total)} saved in total.</p>
        <ul>
          {childGoals.goals.map((goal, i) => {
            return (
              <li key={i}>
                {this.renderGoal(goal)}
              </li>
            )
          })}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="Goals">
        <ul>
          {this.props.goalsForChildren.map((childGoals, i) => {
            return (
              <li key={i}>
                {this.renderChildGoals(childGoals)}
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default Goals;
