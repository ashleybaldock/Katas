const io = require('socket.io-client');
const socket = io('http://localhost:3000/drone');
const uuidv4 = require('uuid/v4');

const start = [53.4779066, -2.247826];

const numDrones = 100;

/*
 * Generates dummy drone test data
 *
 * Drones move at a constant velocity in a random direction
 * Velocity is around 0-2m/s
 *
 * There's also a small chance for drones to stop moving altogether
 */

function randomSign() {
  return Math.random() < 0.5 ? -1 : 1;
}

const drone = (startLocation, velocityMagnitude) => {
  const x = Math.random() / velocityMagnitude * randomSign();
  const y = Math.random() / velocityMagnitude * randomSign();

  let lastLocation = startLocation;

  let stalled = false;

  return {
    id: uuidv4(),
    currentPosition: (timeNow) => {
      if (stalled) { return lastLocation; }
      if (Math.random() > 0.999) { stalled = true; }
      lastLocation = [lastLocation[0] + x, lastLocation[1] + y];
      return lastLocation;
    }
  };
};

const drones = [];
drones.push(drone(start, 1000000)); // This drone is always particularly slow moving, but not stationary
for (let i = 0; i < numDrones; i++) {
  drones.push(drone(start, 100000));
}


const sendUpdate = msg => {
  socket.emit('locationUpdate', msg);
};

const updateDrones = () => {
  drones.forEach(drone => {
    sendUpdate({
      id: drone.id,
      loc: drone.currentPosition(Date.now()),
      time: Date.now()
    });
  });

  setTimeout(updateDrones, 1000);
};

updateDrones();
