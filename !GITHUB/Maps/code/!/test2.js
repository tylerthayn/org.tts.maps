let _ = require('org.tts.js.lodash')
let Maps = require('./')


function distance(lat1,lon1,lat2,lon2,unit){if(lat1==lat2&&lon1==lon2)return 0;var radlat1=Math.PI*lat1/180;var radlat2=Math.PI*lat2/180;var theta=lon1-lon2;var radtheta=Math.PI*theta/180;var dist=Math.sin(radlat1)*Math.sin(radlat2)+Math.cos(radlat1)*Math.cos(radlat2)*Math.cos(radtheta);dist>1&&(dist=1);dist=60*(dist=180*(dist=Math.acos(dist))/Math.PI)*1.1515;'K'==unit&&(dist*=1.609344);'N'==unit&&(dist*=.8684);return dist}

//let Overpass = require('./overpass')
//require('./Elevation')

//Maps.Elevation.ApiKey = 'ttt'

Maps.Overpass.Way('315061563').then(data => {

https://www.openstreetmap.org/#map=16/38.2195/-110.7727

	distances = data.features[0].geometry.coordinates.map(c=>{
		return distance(38.2195, -110.7727, c[1], c[0])
	})
	let min = Math.min.apply(null, distances)

	log(data.features[0].geometry.coordinates[distances.indexOf(min)])

	//log(Maps.Overpass.ToKml(data))

}).catch(log)

