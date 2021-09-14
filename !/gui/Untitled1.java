
gpx.tracks.forEach(track => {
	for (i = 1; i < track.points.length; i++) {
		track.points[i].l = distance(track.points[i].lat, track.points[i].lon, track.points[i-1].lat, track.points[i-1].lon)
		track.points[i].t = track.points[i].time - track.points[i-1].time
	}
	track.points[0].t = 0
	track.points[0].l = 0
	track.distance.Max = () => {
		return Math.max.apply(null, track.points.map(o=>{return o.l}).splice(1))
	}
	track.distance.Mean = () => {
		return _.mean(track.points.map(o=>{return o.l}).splice(1))
	}
	track.distance.Min = () => {
		return Math.min.apply(null, track.points.map(o=>{return o.l}).splice(1))
	}
	track.distance.Total = () => {
		return _.sum(track.points.map(o=>{return o.l}).splice(1))
	}
	track.distance.Find = (l) => {
		for(let i = 1; i < track.points.length; i++) {
			console.log(track.points[i])
			if (Math.abs(track.distance.Mean() - track.points[i].l) < l) {
				console.log(track.points[i])
			}

		}

	}


	track.time = {
		Max: () => {
			console.log(track.points.map(o=>{return o.t}))
			return Math.max.apply(null, track.points.map(o=>{return o.t}).splice(1))
		},
		Mean: () => {
			return _.mean(track.points.map(o=>{return o.t}).splice(1))
		},
		Min: () => {
			return Math.min.apply(null, track.points.map(o=>{return o.t}).splice(1))
		},
		Total: () => {
			return _.sum(track.points.map(o=>{return o.t}).splice(1))
		}
	}
})
