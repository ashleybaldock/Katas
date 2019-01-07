## Install/run

```
npm install && cd client && npm install
npm run startDev
```

Should be all you need, this will run the main server process, drone sim and UI. Access it in your browser at http://localhost:3000

./drones.js  - Simple drone simulation to feed data into server
./client     - react app client
./sockets.js - socketio config
./server.js  - express entry point
./app.js     - main server entry point


## Assumptions and notes
Assumptions based on initial challenge:
- Number of drones: I'm going to assume this is in the range of tens to hundreds, rather than thousands to millions (since the latter would involve much more focus on scalability)
- Drones generally stay within the geographical area of the UK (I'm not going to worry too much about edge cases calculating distances around the poles, for example)
- Location accuracy is determined by general GPS location accuracy, i.e. realistic minimal resolution on the order of 3-5m (I'm going to assume the drones have some much more precise
  form of navigational control internally, and that they're reporting geographic-scale information for tracking purposes) - the resolution of the data is thus in the order of meters
- The drones report only location information at regular intervals, from which their (average) velocity can be determined
- Real-time tracking delay is set at 1s, with the drones reporting their position every 1s. This would be configurable in a real-world system based on user need/bandwidth tradeoff.
- No need to store telemetry, only real-time state in-memory. Need two location fixes to determine velocity however
  - In a real-world system I'd probably design this so that the drones reported their own internal idea of their velocity, rather than calculating it on the server-side based on geo-fixes,
    since that would be more accurate. Or store a history of location fixes and display a moving average of the drone's recent velocity.
- Unique ID assumed to be generated by the drone, I'm going to use a UUID
  - It'd be good to optimise/cache this into a separate WebSocket call (e.g. on connect) so it isn't sent with every location update, to further save on bandwidth
- Location assumed to be decimal lat/lng tuple

Dashboard needs to highlight drones which haven't moved more than 1m in the past 10 seconds, so we need to keep some measure of history for the drones' locations.

Technical decisions:
- Dashboard as a simple React app
- Single API endpoint, use websockets for this too since the data is being updated in realtime
- Nodejs server handling websocket connections from drones and the dashboard (in reality, I might split these into two microservices depending on scale)

Dashboard needs to display:
- Drone's unique ID
- Last location
- Current speed (in m/s and km/h)
- Visual highlight for drones which aren't moving very much (they should display in red)

I chose to use WebSockets as the protocol for the drones reporting their position - this has much lower bandwidth overhead than plain HTTP for regular small updates of information. In a realistic implementation it might not be optimal (you could improve on it by using a custom protocol based on TCP specifically designed to minimise data transfer, for example).
I haven't implemented any security, since that didn't seem to be a focus in the challenge description, but this kind of system would ideally be secured against tampering with the telemetry from the drones, a simple way to implement this would be client certificate based auth for the drones and securing the websocket connections with TLS. The frontend/backend communication could also be easily wrapped in TLS and some kind of authentication mechanism for the API endpoint.


## Questions

* What steps did you took to figure out what you were going to focus on for the assignment?

Firstly I worked out a set of requirements based on the information provided in the assignment, from which I figured out which areas would have the most complexity. I then spent time building the basic skeleton of the application, implementing it with dummy data at each stage, before connecting everything together. Given more time/for a real-world system, I would have used a more test-driven approach but given the scale of the prototype being demanded, and the time constraints, I have focused a lot less on automated testing than I usually would - I figured getting a working prototype was the most important thing to do first.

* About how long did you spend on it?

Around 6 hours, on and off.

* If you had more time, what would you do?

Improve the UI, (automatically) test things a lot more, produce a more extensive drone simulator. I'd also refactor the Drone class to split out logic relating to storing sampled data.

* What is your feedback on the assignment?

It's a pretty extensive test which I struggled to find the time to do. Quite fun though. I'd certainly like to be paid to build systems like this, and have more time to work on them!



