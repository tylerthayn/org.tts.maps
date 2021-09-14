
define(['jquery', 'org.tts.js.lodash', 'ui/feature', 'ui/map', 'style!@css/Map'], function ($, _, Feature, $Map) {
	let features = []

	//let newFeatureData = {"type":"Feature","id":"way/10100558","properties":{"type":"way","id":10100558,"tags":{"intermittent":"yes","natural":"water","source":"TTT","water":"pond","highway":"track","note":"","surface":"dirt","tracktype":"grade5"},"relations":[],"meta":{}},"geometry":{"type":"LineString","coordinates":[[]]}}
	//$('.NewFeature textarea.Data').val(JSON.stringify(newFeatureData, null, 4))


	$(() => {
		$('ol.Features').selectable({
			selected: (event, ui) => {
				window.Features.forEach(feature => {
					if (feature.id == $(ui.selected).text()) {
						feature.Highlight(true)
					}
				})
			},
			unselected: (event, ui) => {
				window.Features.forEach(feature => {
					if (feature.id == $(ui.unselected).text()) {
						feature.Highlight(false)
					}
				})
			}
		})

		$('.Features .Toolbar .Open').on('click', () => {
			App.Feature.Open().then(features => {
				features.forEach(feature => {
					if (_.get(feature, 'type', '') == 'Feature') {
						feature = Feature(feature)
						features.push(feature)
						$('.App').trigger('feature-added', feature)
					}
					if (_.get(feature, 'type', '') == 'FeatureCollection') {
						_.get(feature, 'Features', []).forEach(f => {
							f = Feature(f)
							features.push(f)
							$('.App').trigger('feature-added', f)
						})
					}
				})
			})
		})

		$('.App').on('feature-added', (event, feature) => {
			let li = $(`<li class="Feature">${feature.id}</li>`)
			$('ol.Features').append(li)
		})


		$('.Toolbar i.Delete').on('click', () => {
			$('.ui-selected').each((i, e) => {
				let id = e.innerText
				window.Features.forEach(feature => {
					if (feature.id == e.innerText) {
						feature.$.setMap(null)
						feature.$hl.setMap(null)
					}
				})
				e.remove()
			})
		})

	})
})

/*
		$('.App').on('feature-added', (event, feature) => {
			let points = feature.geometry.coordinates.map(c => {
				return {
					lat: parseFloat(c[1]),
					lng: parseFloat(c[0])
				}
			})

			_.Define(feature, 'CreateDisplay', (style) => {
				let display = new google.maps.Polyline({
					path: points,
					geodesic: true,
					strokeColor: style.strokeColor,
					strokeOpacity: style.strokeOpacity,
					strokeWeight: style.strokeWeight
				})
				return display
			})

			_.Define(feature, 'Highlight', (hl) => {
				if (hl) {
					feature.$.setVisible(false)
					feature.$hl.setVisible(true)
				} else {
					feature.$.setVisible(true)
					feature.$hl.setVisible(false)
				}
			})

			let li = $(`<li class="Feature">${feature.id}</li>`)
			//li.on('click', function (event) {
				//if (li.hasClass('Disabled')) {
				//	li.removeClass('Disabled')
				//	feature.$.setVisible(true)
				//} else {
				//	li.addClass('Disabled')
				//	feature.$.setVisible(false)
				//}
			//})
			$('ol.Features').append(li)
		})
	})

	return features

/*
	$(() => {

		$('.App').on('feature-added', (event, feature) => {
			let points = feature.geometry.coordinates.map(c => {
				return {
					lat: parseFloat(c[1]),
					lng: parseFloat(c[0])
				}
			})

			feature.e = new google.maps.Polyline({
				path: points,
				geodesic: true,
				strokeColor: "#FF00FF",
				strokeOpacity: 1.0,
				strokeWeight: 2,
			})
			feature.e.setMap(window.$Map)

			//let l = L.polyline(
			//	points,
			//	{
			//		color: 'red',
			//		fillColor: '#f03',
			//		fillOpacity: 1.0
			//	}
			//).addTo($map)
			//feature.l = l
			//$map.setView(l.getCenter())
/*
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


			feature.geometry.coordinates.map(c => {return [parseFloat(c[1]), parseFloat(c[0])]}).forEach(point => {
				let circle = L.circle(point, {
					color: 'red',
					fillColor: '#f03',
					fillOpacity: 0.5,
					radius: 50
				}).addTo($.Map)

$.Map.setView(circle.getCenter(), 14)
*/
			//})
//		})



//		$('body').removeClass('Hidden')
//	})

	//return $Features

//})

