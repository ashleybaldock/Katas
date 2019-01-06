
class Drone {
  constructor(id) {
    this.id = id;
    this.lat = 0;
    this.lng = 0;
    this.lastUpdate = 0;
  }

  updateFrom(update) {
    this.lat = update.loc[0];
    this.lng = update.loc[1];
    this.lastUpdate = update.time;
  }
}

module.exports = Drone;
