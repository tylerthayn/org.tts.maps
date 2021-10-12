let assert = require('assert')

const { Point } = require('../')

let point = new Point.XY(115.115, 115.115)
assert.equal(point.x, 115, 'Invalid Point X value')
assert.equal(point.y, 115, 'Invalid Point Y value')
assert.deepEqual(point, [115, 115], 'Invalid Point')

let m = new Point.Meters(115.115, 115.115)
log(m)



