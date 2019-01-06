const Drone = require('../models/drone');

module.exports = (() => {
  const drones = {};

  const upsertDrone = droneUpdate => {
    console.log(droneUpdate);
    if (drones.hasOwnProperty(droneUpdate.id)) {
      return drones[droneUpdate.id].updateFrom(droneUpdate);
    }
    return drones[droneUpdate.id] = new Drone(droneUpdate);
  };

  return {
    upsertDrone
  };
})();
