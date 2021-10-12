//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at https://www.geodatasource.com                         :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: https://www.geodatasource.com                       :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2018            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

require(['jquery', 'lodash-tts', 'lib/GPXParser', 'style!@css/Route'], function ($, _, GPXParser) {
	window.GPXParser = GPXParser
	//if (typeof Map === 'undefined') {Map = {}}
	//if (typeof Map.Point === 'undefined') {Map.Point = {}}
	//if (typeof Map.Point.Deleted === 'undefined') {Map.Point.Deleted = console.log}
	//if (typeof Map.Point.Selecting === 'undefined') {Map.Point.Selecting = console.log}
	//if (typeof Map.Point.Selected === 'undefined') {Map.Point.Selected = console.log}


	$(() => {
		$('ul.Points').selectable({
			filter: 'li',
			selected: function (event, ui) {
				App.Map.Point.Selected($(ui.selected).data('id'))
			},
			selecting: function (event, ui) {
				App.Map.Point.Selecting($(ui.selecting).data('id'))
			},
			start: function (event, ui) {
				App.Map.Selection.Start()
			},
			stop: function (event, ui) {
				App.Map.Selection.Stop()
			}

		})

		$('.Toolbar .Open').on('click', () => {
			App.Route.Open().then(data => {
				gpx = new gpxParser()
				gpx.parse(data)
				_.log(gpx)
				let points = []
				let p = null
				gpx.tracks.forEach(track => {
					let distances = []
					let times = []
					track.points.forEach(point => {

						if (p != null) {
							distances.push(distance(p.lat, p.lon, point.lat, point.lon))
							times.push(Math.abs(point.time - p.time))
						}
						p = point

						AddPoint(point.lat, point.lon, point.ele, point.time)
						App.Map.Point.Add(point)
					})
					_.log('Total'+distances.length)
					_.log('Mean'+_.mean(distances))
					//_.log('AVG'+Math.avg(distances))
					_.log('Min'+Math.min.apply(null, distances))
					_.log('Max'+Math.max.apply(null, distances))

					_.log('Total'+times.length)
					_.log('Mean'+_.mean(times))
					//_.log('AVG'+Math.avg(times))
					_.log('Min'+Math.min.apply(null, times))
					_.log('Max'+Math.max.apply(null, times))

				})
			})
		})
		$('.Toolbar .Clear').on('click', () => {
			$('ul.Points').empty()
			App.Map.Route.Clear()
		})
		$('.Toolbar .Reload').on('click', () => {
			$('ul.Points .deleted').removeClass('deleted')
		})
		$('.Toolbar .Delete').on('click', () => {
			$('ul.Points .ui-selected').each(function () {
				$(this).addClass('deleted')
				$(this).removeClass('ui-selected')
				App.Map.Point.Deleted($(this).data('id'))
			})


		})
	})



	function AddPoint (latitude, longitude, elevation, time) {
		$('ul.Points').append(CreateRow(latitude, longitude, elevation, time))
	}


	function CreateRow (latitude, longitude, elevation, time) {
		let row = $(`
		<li class="Point ui-widget-content">
			<div class="Latitude">${latitude}</div>
			<div class="Longitude">${longitude}</div>
			<div class="Elevation">${elevation}</div>
			<div class="Time">${time == null ? '&nbsp;' : typeof time === 'Date' ? time.toISOString() : time}</div>
		</li>
		`)
		row.data('original-data', JSON.stringify({latitude: latitude, longitude: longitude, elevation: elevation, time: time}))
		row.data('id', $('ul.Points')[0].childNodes.length)
		return row
	}
})


