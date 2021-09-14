let _ = require('org.tts.js.lodash')
let Turf = require('@turf/turf')

module.exports = {
	Turf: Turf,
	Lines: {
		'Join': function () {
			let lines = _.toArray(arguments)

			let v = []
			for (let i = 0; i<lines.length; i++) {
				for (let j=i+1; j<lines.length; j++) {
					v.push({
						distance: Turf.distance(Turf.point(_.First(lines[i])), Turf.point(_.First(lines[j]))),
						from: [i, 0],
						to: [j, 0]
					})
					v.push({
						distance: Turf.distance(Turf.point(_.First(lines[i])), Turf.point(_.Last(lines[j]))),
						from: [i, 0],
						to: [j, 1]
					})
					v.push({
						distance: Turf.distance(Turf.point(_.Last(lines[i])), Turf.point(_.First(lines[j]))),
						from: [i, 1],
						to: [j, 0]
					})
					v.push({
						distance: Turf.distance(Turf.point(_.Last(lines[i])), Turf.point(_.Last(lines[j]))),
						from: [i, 1],
						to: [j, 1]
					})
				}
			}
			return v
		}
	}
}


