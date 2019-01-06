import React, { Component } from 'react';
import './DroneTable.css';
import { subscribeToDroneUpdates } from './api';

class DroneTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drones: []
    };

    subscribeToDroneUpdates((dronePositions) => {
      this.setState({ 
        drones: dronePositions 
      });
    });
  }

  renderDrones(drones) {
    return drones.map((drone, i) => (
      <tr key={i} className={drone.notMoving ? 'notMoving' : ''}>
        <td>{drone.id}</td>
        <td>{drone.speed}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="DroneTable">
        <table>
          <tr>
            <th>Drone ID</th>
            <th>Current Speed</th>
          </tr>
          {this.renderDrones(this.state.drones)}
        </table>
      </div>
    );
  }
}

export default DroneTable;
