
let Kml = require('../src/Kml')


Kml.Load('./data/North Region.kml').then(kml => {
	Kml.Load('./data/styles/Road.kml').then(roadStyles => {
		Kml.Load('./data/styles/Water.kml').then(waterStyles => {

		let roadStyles = Kml.Load('./data/styles/Water.kml')
		log(roadStyles)

		log(_.get(kml, 'kml.Document[0].Style.length'))
		Kml.MergeStyles(kml, roadStyles, waterStyles)
		log(_.get(kml, 'kml.Document[0].Style.length'))

		Kml.Save('./data/TTT.kml', kml)

		//let coordinates = Kml.MergePlacemarks(kml.kml.Document[0].Folder[0].Folder[1].Placemark)

/*
		kml.kml.Document[0].Style = _.uniq(_.concat(
			kml.kml.Document[0].Style.map(s=>{return JSON.stringify(s)}),
			styles.kml.Document[0].Style.map(s=>{return JSON.stringify(s)})
		)).map(s=>{return JSON.parse(s)})

		kml.kml.Document[0].StyleMap = _.uniq(_.concat(
			kml.kml.Document[0].Style.map(s=>{return JSON.stringify(s)}),
			styles.kml.Document[0].Style.map(s=>{return JSON.stringify(s)})
		)).map(s=>{return JSON.parse(s)})
*/
//		Kml.Save('./data/TTT.kml', kml)

		})
	})
})

