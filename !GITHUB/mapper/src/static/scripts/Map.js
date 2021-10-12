
require(['jquery', 'lodash-tts', 'style!@css/Map'], function ($, _) {











	$(() => {

	})




	let ellenPeak = {lat: 38.12262, lng: -110.81344}

	window.initMap = function () {
		let paths = {
			current: new google.maps.Polyline({path: [], geodesic: true, strokeColor: "#FF00FF", strokeOpacity: 1.0, strokeWeight: 5}),
			selecting: new google.maps.Polyline({path: [], geodesic: true, strokeColor: "#FF0000", strokeOpacity: 0.75, strokeWeight: 5}),
			selected: new google.maps.Polyline({path: [], geodesic: true, strokeColor: "#FFFF00", strokeOpacity: 0.5, strokeWeight: 5})
		}

		map = new google.maps.Map(document.getElementById("map"), {
			center: { lat: 38.174984186, lng: -110.81176163 },
			zoom: 8,
		  });


		paths.current.setMap(map)
		paths.selecting.setMap(map)
		paths.selected.setMap(map)


		App.On('Route.Clear', () => {
			_.log('Route.Clear')
			paths.current.setMap(null)
			paths.current = new google.maps.Polyline({path: [], geodesic: true, strokeColor: "#FF00FF", strokeOpacity: 1.0, strokeWeight: 5})
			paths.current.setMap(map)
		})

		App.On('Point.Add', (event, point) => {
			_.log('Add:'+point)
			paths.current.getPath().push(new google.maps.LatLng(point.lat, point.lon))
		})

		App.On('Point.Deleted', (event, id) => {
			_.log('Point.Deleted:'+id)
			paths.current.getPath().removeAt(id)
		})

		App.On('Selection.Start', () => {
			_.log('Selection.Start')
			paths.selecting.setMap(null)
			paths.selected.setMap(null)
			paths.selecting = new google.maps.Polyline({path: [], geodesic: true, strokeColor: "#FF0000", strokeOpacity: 0.75, strokeWeight: 5}),
			paths.selected = new google.maps.Polyline({path: [], geodesic: true, strokeColor: "#FFFF00", strokeOpacity: 0.75, strokeWeight: 5}),
			paths.selecting.setMap(map)
			paths.selected.setMap(map)
		})
		App.On('Point.Selecting', (event, id) => {
			_.log('Point.Selecting:'+id)
			paths.selecting.getPath().push(paths.current.getPath().getAt(id))
		})

		App.On('Selection.Stop', () => {
			_.log('Selection.Stop')
			paths.selecting.setMap(null)
		})
		App.On('Point.Selected', (event, id) => {
			_.log('Point.Selected:'+id)
			paths.selected.getPath().push(paths.current.getPath().getAt(id))
		})
	}

	window.InitMap = function () {
		$(document.head).append($('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2HJJeEeMMgy0qd5c6O7CrjN9O68QfIcQ&libraries=drawing&callback=initMap&v=weekly" async></script>'))
	}

})


