const geolib = require('geolib');

function distanceMovedInWindow(samples, timeNow, windowLength) {
  const endOfWindowTime = timeNow - windowLength;
  return samples.reduce((acc, cur, idx, src) => {
    if (cur.time < endOfWindowTime) { return acc; }
    const t1 = cur.time;
    const t2 = idx + 1 < src.length ? Math.max(src[idx + 1].time, endOfWindowTime) : endOfWindowTime;
    return acc += cur.speed * (t2 - t1) / 1000;
  }, 0);
}

/*
 * This isn't strictly needed, but avoids consuming arbitrary amounts of memory
 */
function trimSamplesToWindowLength(samples, windowLength) {
  const idx = samples.findIndex(element => {
    return element && element.time && element.time < Date.now() - windowLength;
  });
  if (idx > 0) { samples.length = idx; }
  return samples;
}

class Drone {
  constructor(id, windowSeconds) {
    this.id = id;
    this.windowLength = windowSeconds * 1000; // 10s
    this.locationHistory = [];
  }

  latestSample() {
    return this.locationHistory[0]
      ? this.locationHistory[0]
      : { lat: 0, lng: 0, speed: 0, time: 0 };
  }

  /*
   * Our requirements specifically demand that drones which have
   * moved less than 1m in the past 10s are highlighted
   */
  isInMotion() {
    return Math.abs(distanceMovedInWindow(this.locationHistory, Date.now(), this.windowLength)) > 1;
  }

  updateFrom(update) {
    const last = this.locationHistory[0];

    /*
     * geolib has a getSpeed() method, but you can't control the precision
     */
    function speedFromLast(last, next) {
      if (!last) { return 0; }
      const distance = geolib.getDistance(last, next, 1, 3);
      const time = Number(last.time - next.time) / 1000.0;
      return Math.abs(distance / time); // m/s
    }

    const newSample = {
      lat: update.loc[0],
      lng: update.loc[1],
      time: update.time,
    };

    newSample.speed = speedFromLast(last, newSample);

    /*
     * locationHistory is begging to be refactored out into its' own class
     */
    this.locationHistory.unshift(newSample);
    this.locationHistory = trimSamplesToWindowLength(this.locationHistory, this.windowLength);
  }
}

module.exports = Drone;
