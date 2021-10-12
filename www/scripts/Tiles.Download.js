window.log = console.log

require(['jquery', 'org.tts.js.lodash', 'org.tts.js.Maps', 'style!@css/App'], function ($, _, Maps) {
	$(() => {
		$('button.DownloadButton').on('click', () => {
			let tile = new Maps.Tile(Maps.Coordinate.LonLat($('#Longitude').val(), $('#Latitude').val()), $('#Zoom').val())
			let m = Maps.GlobalMercator.LatLonToMeters(tile.bounds.center.lat, tile.bounds.center.lon)
			let radius = 0
			if ($('#RadiusUnits').val() == 'tiles') {
				radius = $('#Radius').val() * Maps.TileSizes[$('#Zoom').val()]
			}
			if ($('#RadiusUnits').val() == 'miles') {
				radius = $('#Radius').val() * 1609.34
			}

			let keys = []
			for (i=m.my-radius;i<=m.my+radius;i+=Maps.TileSizes[$('#Zoom').val()]) {
				for (j=m.mx-radius; j<=m.mx+radius; j+=Maps.TileSizes[$('#Zoom').val()]) {
					let t = Maps.GlobalMercator.MetersToTile(j, i, $('#Zoom').val())
					let key = Maps.GlobalMercator.QuadKey(t.tx, t.ty, $('#Zoom').val())
					keys.push(key)
				}
			}
			$.post('/tiles/download', {
				type: $('#TileType').val(),
				keys: keys,
				width: $('#Width').val(),
				height: $('#Height').val()
			}, (data, status) => {
				log(data)
			})
		})

		$('button.DetailsButton').on('click', () => {
			let tile = new Maps.Tile(Maps.Coordinate.LonLat($('#Longitude').val(), $('#Latitude').val()), $('#Zoom').val())
			let m = Maps.GlobalMercator.LatLonToMeters(tile.bounds.center.lat, tile.bounds.center.lon)
			let radius = 0
			if ($('#RadiusUnits').val() == 'tiles') {
				radius = $('#Radius').val() * Maps.TileSizes[$('#Zoom').val()]
			}
			if ($('#RadiusUnits').val() == 'miles') {
				radius = $('#Radius').val() * 1609.34
			}

			let keys = []
			for (i=m.my-radius;i<=m.my+radius;i+=Maps.TileSizes[$('#Zoom').val()]) {
				for (j=m.mx-radius; j<=m.mx+radius; j+=Maps.TileSizes[$('#Zoom').val()]) {
					let t = Maps.GlobalMercator.MetersToTile(j, i, $('#Zoom').val())
					let key = Maps.GlobalMercator.QuadKey(t.tx, t.ty, $('#Zoom').val())
					keys.push(key)
				}
			}

			let details = {}
			keys.forEach(key => {
				details[key] = new Maps.Tile(key).bounds
			})
			logj(details)

		})


	})

})


