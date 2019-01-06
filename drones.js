const io = require('socket.io-client');
const socket = io('http://localhost:3000/drone');
const uuidv4 = require('uuid/v4');

const start = [53.4779066,-2.247826];

const numDrones = 100;

/*
 * Generates dummy drone test data
 */

const drone = (startLocation) => {
  const x = Math.random() / 10000;
  const y = Math.random() / 10000;

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
for (let i = 0; i < numDrones; i++) {
  drones.push(drone(start));
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
