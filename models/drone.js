const geolib = require('geolib');

class Drone {
  constructor(id) {
    this.id = id;

    /*
     * In a real implementation I'd use something smarter for this
     * Like a data structure which automatically ages out data beyond
     * a certain time range (e.g. 10s) or a time-series database
     */
    this.locationHistory = [[0,0,0], [0,0,0]];
  }

  /*
   * This would probably be better implemented as a moving average
   * velocity over the last N sampled data points
   */
  speed() {
    return geolib.getSpeed(
      {
        lat: this.locationHistory[1][0],
        lng: this.locationHistory[1][1],
        time: this.locationHistory[1][2]
      },
      {
        lat: this.locationHistory[0][0],
        lng: this.locationHistory[0][1],
        time: this.locationHistory[0][2]
      }
    );
  }

  latestLocation() {
    return { lat: this.locationHistory[0][0], lng: this.locationHistory[0][1] };
  }

  /*
   * Our requirements specifically demand that drones which have
   * moved less than 1m in the past 10s are highlighted
   */
  droneIsInMotion() {
  }

  updateFrom(update) {
    this.locationHistory.unshift([update.loc[0], update.loc[1], update.time]);
    this.locationHistory.length = 20;
  }
}

module.exports = Drone;
