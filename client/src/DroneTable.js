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
      <tr key={i} className={drone.inMotion ? '' : 'notMoving'}>
        <td>{drone.id}</td>
        <td className="cellRight">{drone.speed.toFixed(3)} m/s</td>
        <td className="cellRight">{(drone.speed / 1000 * 60 * 60).toFixed(2)} km/h</td>
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
              <th rowspan="2">Drone ID</th>
              <th colspan="2">Current Speed</th>
              <th rowspan="2">Latitude</th>
              <th rowspan="2">Longitude</th>
            </tr>
            <tr>
              <th>(m/s)</th>
              <th>(km/h)</th>
            </tr>
            {this.renderDrones(this.state.drones)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DroneTable;
