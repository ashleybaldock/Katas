import io from 'socket.io-client';
const socket = io('http://localhost:3000/client');

function subscribeToDroneUpdates (callback) {
  socket.on('droneUpdate', dronePositions => callback(dronePositions));
}

export { subscribeToDroneUpdates };
