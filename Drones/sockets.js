const drones = require('./db/drones');

const transformDrones = drones => {
  return Object.keys(drones).map((droneId) => ({
    id: droneId,
    speed: drones[droneId].latestSample().speed,
    lat: drones[droneId].latestSample().lat,
    lng: drones[droneId].latestSample().lng,
    inMotion: drones[droneId].isInMotion()
  }));
};

module.exports = function (io) {
  io.of('/drone').on('connection', socket => {
    console.log(`drone socket connect: ${socket.id}`);
    socket.on('locationUpdate', data => {
      drones.upsertDrone(data);
    });
  });

  io.of('/client').on('connection', socket => {
    console.log(`client socket connect: ${socket.id}`);
  });

  setInterval(() => {
    io.of('/client').emit('droneUpdate', transformDrones(drones.getAll()));
  }, 1000);
}
