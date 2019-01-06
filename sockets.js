const drones = require('./db/drones');

module.exports = function (io) {
  io.on('connection', socket => {
    socket.on('locationUpdate', data => {
      console.log(data);
      //drones.upsertDrone(data);
    });
  });
}
