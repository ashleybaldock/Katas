const Drone = require('../models/drone');

module.exports = (() => {
  const drones = {};

  const upsertDrone = droneUpdate => {
    if (drones.hasOwnProperty(droneUpdate.id)) {
      return drones[droneUpdate.id].updateFrom(droneUpdate);
    }
    return drones[droneUpdate.id] = new Drone(droneUpdate, 10);
  };

  const getAll = () => {
    return drones;
  };

  return {
    upsertDrone,
    getAll
  };
})();
