import React, { Component } from 'react';
import Goal from './Goal';
import formatGbp from './util/formatGbp.js';
import './Goals.css';

class Goals extends Component {
  componentWillMount() {
    this.props.onLoad();
  }

  // Get child's name from username by trimming the trailing numbers
  processUsername(username) {
    return username.replace(/\d+$/, "");
  }

  renderChildGoals(childGoals) {
    return (
      <div className="ChildGoals">
        <h1 className="ChildGoals__ChildName">{this.processUsername(childGoals.username)}&#39;s saving goals</h1>
        <p className="ChildGoals__GoalsTotal">{this.processUsername(childGoals.username)} has {formatGbp(childGoals.goalsTotal)} saved toward their goals, and a total available balance of {formatGbp(childGoals.total)}.</p>
        <ul>
          {childGoals.goals.map((goal, i) => {
            return (
              <li key={i}>
                <Goal { ...{ goal } } />
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
