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
try {Fs.mkdirSync('./files')} catch (e) {}

let boxWidth = box.e - box.w, boxHeight = box.n - box.s

log('#\tw\ts\te\tn\n\n')
count = 1
for (let i = tiles[0][0]; i <= tiles[0][1]; i++) {
	for (let j = tiles[1][0]; j <= tiles[1][1]; j++) {

		let _box = {
			n: box.n - i * (box.n - box.s),
			s: box.s - i * (box.n - box.s),
			e: box.e - j * (box.e - box.w),
			w: box.w - j * (box.e - box.w)
		}

		log(`${count}\t${_box.w.toFixed(6)}\t${_box.s.toFixed(6)}\t${_box.e.toFixed(6)}\t${_box.n.toFixed(6)}`)

		DownloadImage(
			`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/[${_box.w},${_box.s},${_box.e},${_box.n}]/${img.w}x${img.h}${doubleScale}?access_token=${accessToken}`,
			Path.resolve(`./files/${count}.jpg`),
			() => {
				//im.convert([`files\${i}x${j}.jpg`, '-crop', '1024x1024', `files\${i}x${j}_.jpg`], log)
				/*
				im.crop({
					srcPath: Path.resolve(`./files/${i}x${j}.jpg`),
					dstPath: Path.resolve(`./files/${i}x${j}_.jpg`),
					width: 1024,
					height: 1024,
					quality: 1,
					gravity: 'North'
				}, log)
				*/
			}
		)
		count++

		//let _center = [
		//	center[1] + i * boxHeight,
		//	center[0] + j * boxWidth
		//]
	}
}


//log(box.e - box.w)
//log(box.n - box.s)


//log('W:'+Turf.distance([box.e, box.n], [box.w, box.n], {units: 'miles'}))
//log('H:'+Turf.distance([box.e, box.n], [box.e, box.s], {units: 'miles'}))


//center[0]

//DownloadImage(url, Path.resolve('./Tiles/0-0.jpg'), () => {
//	log('done')
//})

function GetTile (id, cb) {


}


function DownloadImage (url, path, cb) {
	let out = Fs.createWriteStream(path)

	https.get(url, (res) => {
		log(url)
		 console.log(`HEADERS: ${JSON.stringify(res.headers, null, 4)}`);
		res.on('error', cb)
		res.on('end', () => {cb(null)})
		res.pipe(out)
	}).on('error', cb)

}

