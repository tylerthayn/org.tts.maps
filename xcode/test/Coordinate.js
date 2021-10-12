let assert = require('assert')

const { Coordinate } = require('../')

let c = new Coordinate.LonLat(-110.81466, 38.12130)
assert.equal(c.lon, -110.81466, 'Invalid Coordinate Longitude value')
assert.equal(c.lat, 38.12130, 'Invalid Coordinate Latitude value')
assert.deepEqual(c, [-110.81466, 38.12130, 0], 'Invalid Coordinate')
log(c)
let m = c.ToMeters
log(m)
log(m.ToLatLon)
log(m.ToLonLat)
