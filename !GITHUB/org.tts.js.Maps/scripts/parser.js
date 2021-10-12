let _ = require('lodash-tts')
let Maps = require('../')

let Track = require('../src/Track')

let data = {
	places: [],
	relations: [],
	roads: [],
	water: []
}

Maps.OSM('./data/Henry Mountains.osm').then(osm => {
	//_.log(typeof osm)
	//_.logj(osm)
	osm.node.forEach(node => {
		if (node.Is('WATER')) {
			data.water.push('NODE='+node.Id)
		}
		if (node.Is('ROAD')) {
			data.roads.push('NODE='+node.Id)
		}
	})
	osm.way.forEach(way => {
		if (way.Is('ROAD')) {
			data.roads.push(way.Id)
		}
		if (way.Is('WATER')) {
			data.water.push(way.Id)
		}
	})
	//_.log('ROAD:'+osm.Tracks[0].Is('ROAD'))
	//_.log('WATER:'+osm.Tracks[0].Is('WATER'))

	//_.log(osm.note)
	//_.log(osm.meta)
	//_.log(osm.relation)

	_.log(CreateOverpassCode(data.roads))

	//_.log(osm.way)
	//_.log(data)
//_.log(Object.keys(osm))

}).catch(console.log)


function CreateOverpassCode (ids) {
	let code = ''
	ids.forEach(id => {
		if (id.includes('=')) {
			code += id.split('=')[0] + '(' + id.split('=')[1] + ');\nout geom;\n\n'
		} else {
			code += 'way('+id+');\nout geom;\n\n'
		}
	})
	return code
}


/*
let _ = require('lodash-tts')
let Fs = require('fs'), Path = require('path')
let parseString = require('xml2js').parseString

//parseString(Fs.readFileSync(Path.resolve('./All.osm'), 'utf-8'), function (err, osm) {
//    _.logj(osm)
//});

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

function LoadOsm (path) {
	return new Promise((resolve, reject) => {
		Fs.readFile(Path.resolve(path), 'utf-8', (err, contents) => {
			if (err) {return reject(err)}
			OSM(contents).then(resolve).catch(reject)
		})
	})
}

function OSM (data) {
	return new Promise((resolve, reject) => {
		parseString(data, (err, osm) => {
			if (err) {
				return reject(err)
			}
			osm = osm.osm
			osm.way.forEach(way => {
				way.Tags = {}
				way.Id = way.$.id
				way.Bounds = way.bounds
				way.tag.forEach(tag => {
					way.Tags[tag.$.k] = tag.$.v
				})
				way.Points = way.nd.map(p=>{
					return p.$
				})
				way.Distance = 0
				for (i=1; i < way.Points.length; i++) {
					way.Distance += Math.abs(distance(way.Points[i].lat, way.Points[i].lon, way.Points[i-1].lat, way.Points[i-1].lon))
				}
			})
			resolve(osm)
		})
	})
}


LoadOsm('./All.osm').then(osm => {

	_.logj(osm.way[3])
	//_.log(_.get(osm, 'way[3].Tags'))

//	osm.way.forEach(way => {
//		_.log(way['$'].id)
//	})

//	_.logj(Object.keys(osm))
}).catch(console.log)
*/
