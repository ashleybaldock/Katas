const geolib = require('geolib');

class Drone {
  constructor(id) {
    this.id = id;
    this.lat = 0;
    this.lng = 0;
    this.lastlat = 0;
    this.lastlng = 0;
    this.lastUpdate = 0;
  }

  speed() {
    return geolib.getSpeed(
      { lat: this.lastlat, lng: this.lastlng, time: this.lasttime },
      { lat: this.lat, lng: this.lng, time: this.lastUpdate }
    );
  }

  updateFrom(update) {
    this.lastlat = this.lat;
    this.lastlng = this.lng;
    this.lasttime = this.lastUpdate;
    this.lat = update.loc[0];
    this.lng = update.loc[1];
    this.lastUpdate = update.time;
  }
}

module.exports = Drone;
