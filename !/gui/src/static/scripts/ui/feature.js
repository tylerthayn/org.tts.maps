
define(['jquery', 'org.tts.js.lodash', 'style!@css/Map'], function ($, _) {



	return function Feature (feature) {

		_.Define(feature, 'Points', {get: function () {
			return feature.geometry.coordinates.map(c => {
				return {
					lat: typeof(c[1]) === 'string' ? parseFloat(c[1]) : c[1],
					lng: typeof(c[0]) === 'string' ? parseFloat(c[0]) : c[0]
				}
			})
		}})

		_.Define(feature, 'IsRoad', {get: function () {
			if (_.get(this, 'properties.tags.highway', '').match(/(tertiary|track)/)) {
				return true
			}
			return false
		}})

		_.Define(feature, 'IsWater', {get: function () {
			if (_.get(this, 'properties.tags.intermittent', '') == 'yes') {
				return true
			}
			if (_.get(this, 'properties.tags.natural', '') == 'water') {
				return true
			}

			return false
		}})

		//_.Define(feature. 'Cut', (lat, lng) => {
			//Turf.lineString(feature.geometry.coordinates

		//})

		_.Define(feature, 'Draw', (map) => {
			if (feature.IsWater) {
				feature.$ = new google.maps.Polyline({
					path: feature.Points,
					geodesic: true,
					strokeColor: '#336699',
					strokeOpacity: 0.8,
					strokeWeight: 2
				})
			} else if (feature.IsRoad) {
				const lineSymbol = {
					//path: "M 0,-1 0,1",
					path: "M 0,-1 0,1",
					strokeOpacity: 0.8,
					strokeColor: '#000000',
					strokeWeight: 2,
					scale: 2,
				}

				feature.$ = new google.maps.Polyline({
					path: feature.Points,
					geodesic: true,
					strokeColor: '#FFFFFF',
					strokeOpacity: 0.6,
					strokeWeight: 5,
					icons: [{
						icon: lineSymbol,
						offset: "0",
						repeat: "10px"
					}]
				})
			} else {
				feature.$ = new google.maps.Polyline({
					path: feature.Points,
					geodesic: true,
					strokeColor: '#FF00FF',
					strokeOpacity: 0.8,
					strokeWeight: 2
				})
			}
			feature.$hl = new google.maps.Polyline({
				path: feature.Points,
				geodesic: true,
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 4
			})
			feature.$.setMap(map)
			feature.$hl.setMap(map)
			google.maps.event.addListener(feature.$hl, 'click', function (event) {
				let point = Turf.nearestPointOnLine(Turf.lineString(feature.geometry.coordinates), Turf.point([event.latLng.lng(), event.latLng.lat()]))
				let marker = new google.maps.Marker({
					position: {lng: point.geometry.coordinates[0], lat: point.geometry.coordinates[1]},
					map,
					title: 'Click to cut',
					icon: 'D:/Maps/gui/src/static/images/cut.png',
					/*
					icon: {
						path: "M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3h-3z",
						fillColor: 'red',
						fillOpacity: 0.6,
						strokeWeight: 0,
						rotation: 0,
						scale: 2,
						anchor: new google.maps.Point(15, 30),
					},
					*/
				})
				marker.setMap(map)
				marker.addListener('click', () => {
					log(Turf.lineSplit(Turf.lineString(feature.geometry.coordinates), point))
				})
			})
		})



/*
		_.Define(feature, 'CreateDisplay', (style) => {
			let display = new google.maps.Polyline({
				path: feature.Points,
				geodesic: true,
				strokeColor: style.strokeColor,
				strokeOpacity: 0.5,
				strokeWeight: style.strokeWeight,
				icons: [{
					icon: lineSymbol,
					offset: "0",
					repeat: "20px"
				}]
			})
			return display
		})
		*/

		_.Define(feature, 'Highlight', (hl) => {
			if (hl) {
				feature.$.setVisible(false)
				feature.$hl.setVisible(true)
			} else {
				feature.$.setVisible(true)
				feature.$hl.setVisible(false)
			}
		})

		return feature
	}

})

