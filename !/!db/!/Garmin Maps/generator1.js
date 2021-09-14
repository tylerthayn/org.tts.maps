let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let https = require('https')
let Turf = require('@turf/turf')
let im = require('imagemagick')

let center = [-110.8146614, 38.1213006]
let tiles = [[-3, 3], [-3, 3]]
let accessToken = 'pk.eyJ1IjoidHRzZGVzaWduIiwiYSI6ImNrc2lnd2k4aTA3MXkybnFtZGdrYnV1b2cifQ.Mo1cEgeaPgrP22w24rsBcA'
let img = {w: 1024, h: 1024}, doubleScale = ''//'@2x'
let zoom = 15, bearing = 0, pitch = 0
//let url = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${center[0]},${center[1]},${zoom},${bearing}/${img.w}x${img.h}${doubleScale}?access_token=${accessToken}`

let box = {n: 38.1258, s: 38.1172, e: -110.8092, w: -110.8202}
let url = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/[${box.w},${box.s},${box.e},${box.n}]/${img.w}x${img.h}${doubleScale}?access_token=${accessToken}`

let geoJSON={type:'FeatureCollection',features:[{type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[[[-110.8091174696329,38.12563749908799],[-110.8203264370651,38.12563749908799],[-110.8203264370651,38.11728297849371],[-110.8091174696329,38.11728297849371],[-110.8091174696329,38.12563749908799]]]}}]}




let boxWidth = box.e - box.w, boxHeight = box.n - box.s
count = 1
for (let i = tiles[0][0]; i <= tiles[0][1]; i++) {
	for (let j = tiles[1][0]; j <= tiles[1][1]; j++) {

		let _box = {
			n: box.n - i * (box.n - box.s),
			s: box.s - i * (box.n - box.s),
			e: box.e - j * (box.e - box.w),
			w: box.w - j * (box.e - box.w)
		}

let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<name>${count}</name>
<open>1</open>
<GroundOverlay>
	<name>${count}</name>
	<Icon>
		<href>files/${count}.jpg</href>
		<viewBoundScale>0.75</viewBoundScale>
	</Icon>
	<LatLonBox>
		<north>${_box.n}</north>
		<south>${_box.s}</south>
		<east>${_box.e}</east>
		<west>${_box.w}</west>
	</LatLonBox>
</GroundOverlay>
</kml>
`
Fs.mkdirSync('./out/'+count+'/files', {recursive: true})
Fs.writeFileSync('./out/'+count+'/doc.kml', kml, 'utf-8')
Fs.copyFileSync('./files/'+count+'.jpg', './out/'+count+'/files/'+count+'.jpg')

	count++

	}
}



