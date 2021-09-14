let _ = require('org.tts.js.lodash')
let Kml = require('./src/Kml')
//let Overpass = require('./Overpass')
//let Query = require('query-overpass')
//let Turf = require('@turf/turf')
//let basePath = 'D:/GITHUB/Maps/kml/'

//Kml.Use(require.resolve('./plugins/Styler'))

//let kml = new Kml(Overpass('way/630174617'))
//

let kml = new Kml('D:/Maps/db/Hikes.kml')
//let kml = new Kml('D:/GITHUB/Maps/kml/North.kml')
//log(kml.kml.Document[0])
kml.kml.Document[0].Folder[0].Placemark.forEach(placemark => {
	log(placemark.toGeoJSON())
})

//log(kml.Tree['North Region.Water.Oak Creek'].IsRoad)
//log(Turf.length(Turf.lineString(kml.Tree['North Region.Water.Oak Creek'].Coordinates()), {units: 'miles'}))

//let kml = new Kml('way/630174617.kml')
//log(kml.kml.Document[0])
//kml.Styles.Apply(new Kml(basePath+'Styles.kml'))
//_.logj(kml.kml.Document[0])
//kml.Styles.Clear()
//log(kml.kml.Document[0])

//log(kml.Export())

//kml = new Kml('315061563.kml')

//_.logj(kml)
//kml.Save('D:/GITHUB/Maps/kml/North1.kml')
