
define(['jquery', 'org.tts.js.lodash', 'leaflet', 'style!@css/Map'], function ($, _, L) {
	let ellenPeak = {lat: 38.12262, lng: -110.81344}

	let defaults = {
		element: $('#Map')[0],
		view: {
			center: ellenPeak,
			zoom: 8,
			mapTypeId: 'satellite'
		}
	}

	window.Features = []
	function Map (options) {
		if (window.initMap instanceof Function) {log('F');return undefined}
		this.options = new _.Options(defaults, options)

		this._map = new google.maps.Map(this.options.element, this.options.view)

		$('.App').on('feature-added', (event, feature) => {
			window.Features.push(feature)
			feature.Draw(this._map)
			feature.Highlight(false)
			/*
			feature.$ = feature.CreateDisplay({
				strokeColor: feature.IsRoad ? '#FFFBFB' : feature.IsWater ? '#0000FF' : '#336699',
				strokeOpacity: 1.0,
				strokeWeight: 2
			})
			feature.$.setMap(this._map)

			feature.$hl = feature.CreateDisplay({
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 3
			})
			feature.$hl.setMap(this._map)
			feature.Highlight(false)
			*/
		})

		return this
	}

/*
	Map.prototype.AddFeature = function (event, feature) {
		let points = feature.geometry.coordinates.map(c => {
			return {
				lat: parseFloat(c[1]),
				lng: parseFloat(c[0])
			}
		})

		feature._style = {
			strokeColor: '#FF00FF',
			strokeOpacity: 1.0,
			strokeWeight: 2
		}
		feature._hl = {
			strokeColor: '#0000FF',
			strokeOpacity: 0.8,
			strokeWeight: 3
		}

		feature.$ = new google.maps.Polyline({
			path: points,
			geodesic: true,
			strokeColor: feature._style.strokeColor,
			strokeOpacity: feature._style.strokeOpacity,
			strokeWeight: feature._style.strokeWeight
		})
		feature.$.setMap(this._map)

		feature.$hl = new google.maps.Polyline({
			path: points,
			geodesic: true,
			strokeColor: feature._hl.strokeColor,
			strokeOpacity: feature._hl.strokeOpacity,
			strokeWeight: feature._hl.strokeWeight
		})
		feature.$hl.setMap(this._map)
		feature.$hl.setVisible(false)
	}
*/

	return Map





/*
	$('.App').on('feature-added', (event, feature) => {
		let points = feature.geometry.coordinates.map(c => {
			return new L.LatLng(parseFloat(c[1]), parseFloat(c[0]))
		})

		log(points)

		let l = new L.polyline(
			points,
			{
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 1.0
			}
		).addTo(mymap)
		feature.l = l
	})


		let html = $(`<li class="Feature"><input type="checkbox">${feature.id}</li>`)
		html.on('click', function (event) {
			html.find('[type="checkbox"]').checked = !html.find('[type="checkbox"]').checked
			if (html.find('[type="checkbox"]').checked) {
				$(l.getElement()).removeClass('Hidden')
			} else {
				$(l.getElement()).addClass('Hidden')
			}
		})
		$('ol.Features').append(html)
		_map.setView(l.getCenter(), 14)

		feature.geometry.coordinates.map(c => {return [parseFloat(c[1]), parseFloat(c[0])]}).forEach(point => {
			let circle = L.circle(point, {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 50
			}).addTo(_map)
		})
	})
	$('.App').on('feature-selectedx', (event, feature) => {
		feature.geometry.coordinates.map(c => {return [parseFloat(c[1]), parseFloat(c[0])]}).forEach(point => {
			let circle = L.circle(point, {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 50
			}).addTo(mymap)
		})


		let points = feature.geometry.coordinates.map(c => {
			return new L.LatLng(parseFloat(c[1]), parseFloat(c[0]))
		})
		window.l = L.polyline(
			points,
			{
				color: 'blue',
				weight: 3,
				opacity: 1.0
			}
		)
		log(window.l)
		window.l.addTo(mymap)
		mymap.setView(l.getBounds().getCenter())

	})
*/
	return $Map
})

