let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Deasync = require('deasync')
let Parser = Deasync(require('xml2js').parseString)
let Builder = require('xml2js').Builder
let Turf = require('@turf/turf')
function Gpx (s) {
	let gpx = {};
    gpx = 'string' == typeof s ? Parser(s.match(/\<.+\>/) ? s : Fs.readFileSync(Path.resolve(s), 'utf-8')) : {}

	_.Define(gpx, 'ToGeoJSON', () => {
		let collection = {
			type: 'FeatureCollection',
			features: []
		}

		gpx.gpx.trk.forEach(track => {
			track.trkseg.forEach(segment => {
				let feature = {
					type: 'Feature',
					id: 0,
					properties: {
						tags: {

						}
					},
					geometry: {
						type: 'LineString',
						coordinates: segment.trkpt.map(pt => {
							return [parseFloat(pt.$.lon), parseFloat(pt.$.lat), parseFloat(pt.ele)]
						})
					}

				}
				collection.features.push(feature)
			})
		})

		return collection

	}, true)


	_.Define(gpx, 'ToKml', () => {
		let kml = '<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">\n<Document>\n'
		kml += `
<Style id="Road_Hike_">
		<LineStyle>
			<color>bbff00ff</color>
			<width>3</width>
		</LineStyle>
	</Style>
<Style id="road_hl">
		<IconStyle>
			<scale>1.2</scale>
		</IconStyle>
		<LineStyle>
			<color>ff0000ff</color>
			<width>5</width>
		</LineStyle>
	</Style>
	<StyleMap id="Road_Hike">
		<Pair>
			<key>normal</key>
			<styleUrl>#Road_Hike_</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#road_hl</styleUrl>
		</Pair>
	</StyleMap>
`
		gpx.gpx.trk.forEach(track => {
			//kml += '\t<folder>\n'
			kml += '\t\t<name>'+track.name+'</name>\n'

			track.trkseg.forEach(segment => {
				kml += '\t\t<Placemark>\n'
				kml += '\t\t<styleUrl>#Road_Hike</styleUrl>\n'
/*
			kml += `<name>Blue Valley Road</name>
			<ExtendedData>
				<Data name="@id">
					<value>way/315061562</value>
				</Data>
				<Data name="highway">
					<value>track</value>
				</Data>
				<Data name="name">
					<value>Blue Valley Road</value>
				</Data>
				<Data name="ref">
					<value>CR 92</value>
				</Data>
				<Data name="source">
					<value>http://recorded2477roads.utah.gov/wayne/b-roads/index.html</value>
				</Data>
				<Data name="surface">
					<value>dirt</value>
				</Data>
				<Data name="tracktype">
					<value>grade3</value>
				</Data>
			</ExtendedData>
`
		*/		let points = []
				segment.trkpt.forEach(point => {
					points.push([parseFloat(point.$.lon), parseFloat(point.$.lat), parseFloat(point.ele)])
				})
				kml += '\t\t\t<LineString>\n\t\t\t\t<coordinates>\n\t\t\t\t\t'
				kml += points.map(point => {return point[0].toString() + ',' + point[1].toString() + ',' + point[2].toString()}).join(' ')
				kml += '\n\t\t\t\t</coordinates>\n\t\t\t</LineString>\n\t\t</Placemark>\n'
			})
			//kml += '\t</folder>\n'
		})

		kml += '</Document>\n</kml>'

		return kml

	}, true)


	return gpx
}


module.exports = Gpx

let Maps = require('./')

/*
let dir = 'C:\\Users\\TTS Design\\Desktop\\Buffalo Hunt\\!\\GPX\\Archive'
Fs.readdirSync(dir).forEach(file => {
	log(file)
	//if (file.startsWith('Track_') && file.endsWith('.gpx')) {
		let gpx = new Gpx(Path.resolve(dir, file))
		log(Path.resolve(dir, file.replace('.gpx', '.kml')))
		Fs.writeFileSync(Path.resolve(dir, file.replace('.gpx', '.kml')), gpx.ToKml(), 'utf-8')
	//}
})
*/

let gpx = new Gpx('C:\\Users\\TTS Design\\Desktop\\Buffalo Hunt\\!\\GPX\\Track_JUL4.gpx')
Fs.writeFileSync('C:\\Users\\TTS Design\\Desktop\\Buffalo Hunt\\!\\GPX\\Track_JUL4.kml', gpx.ToKml(), 'utf-8')

//gpx = new Gpx('C:\\Users\\TTS Design\\Desktop\\Buffalo Hunt\\GPX 9-23\\Archive\\2021-09-13 14.01.52 Week.gpx')
//Fs.writeFileSync('C:\\Users\\TTS Design\\Desktop\\Buffalo Hunt\\GPX 9-23\\Archive\\2021-09-13 14.01.52 Week.kml', gpx.ToKml(), 'utf-8')
process.exit();

//log(gpx.ToKml())
//logj(gpx.ToGeoJSON())
let key = Maps.Tile.TileFromBounds(Turf.bbox(gpx.ToGeoJSON().features.pop()))
let tile = new Maps.Tile(key)
//log(tile.bounds)
//log(Maps.GlobalMercator.TileBounds(tile.tx, tile.ty, key.length))

let feature = Turf.lineSlice(Turf.point([-110.811285,  38.175635]), Turf.point([-110.7827720884, 38.2028380316]), gpx.ToGeoJSON().features.pop())

log(`<?xml version='1.0' standalone='no'?>
<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 20001102//EN' 'http://www.w3.org/TR/2000/CR-SVG-20001102/DTD/svg-20001102.dtd'>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1024px" height="1024px" viewBox="0 0 1024 1024" style="border: 2px solid blue;color: red;width:1024px;height:1024px;" xml:space="preserve">
    <path d='${tile.bounds.Points((feature.geometry.coordinates.map(point => {
	return Maps.Coordinate.LonLat(point[0], point[1], point[2])
}))).map(point => {
	return [point[0] * 1024, 1024 - point[1] * 1024]
}).map(point => {
	return 'L'+point[0].toFixed() + ',' + point[1].toFixed()
}).join('').replace(/^L/, 'M')}z' style='fill:white; stroke:black; stroke-width:5'/>
</svg>
`)

//log(tile.bounds.Point(Maps.Coordinate.LonLat(-110.805724, 38.173391)).map(point => {return point*1024}))

