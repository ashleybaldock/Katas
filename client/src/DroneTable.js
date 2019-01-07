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
        <td className="cellRight">{drone.speed.toFixed(1)} km/h</td>
        <td className="cellRight">{drone.lat.toFixed(6)}</td>
        <td className="cellRight">{drone.lng.toFixed(6)}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="DroneTable">
        <table>
          <tbody>
            <tr>
              <th>Drone ID</th>
              <th>Current Speed</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
            {this.renderDrones(this.state.drones)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DroneTable;
