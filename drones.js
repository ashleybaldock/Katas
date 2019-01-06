const io = require('socket.io-client');
const socket = io('http://localhost:3000/drone');
const uuidv4 = require('uuid/v4');

const start = [53.4779066,-2.247826];

const numDrones = 100;

/*
 * Generates dummy drone test data
 */

const drone = (startLocation) => {
  return {
    id: uuidv4(),
    currentPosition: (timeNow) => {
      return startLocation;
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
