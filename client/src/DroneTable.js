import React, { Component } from 'react';
import './DroneTable.css';

class DroneTable extends Component {
  renderDrones(drones) {
    return drones.map((drone, i) => (
      <tr key={i} className={drone.notMoving ? 'notMoving' : ''}>
        <td>{drone.id}</td>
        <td>{drone.speed}</td>
      </tr>
    ));
  }

  render() {
    const { drones } = this.props;
    return (
      <div className="DroneTable">
        <table>
          <tr>
            <th>Drone ID</th>
            <th>Current Speed</th>
          </tr>
          {this.renderDrones(drones)}
        </table>
      </div>
    );
  }
}

export default DroneTable;
