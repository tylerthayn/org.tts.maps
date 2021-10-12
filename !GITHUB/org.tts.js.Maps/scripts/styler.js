let _ = require('lodash-tts')
let Fs = require('fs'), Path = require('path')
let parseString = require('xml2js').parseString
let Builder = require('xml2js').Builder

let _stylesXml = {
	road: `
		<open>1</open>
		<Style id="default">
			<LineStyle>
				<color>bbbfffff</color>
				<width>3</width>
			</LineStyle>
		</Style>
		<Style id="MainRoad0">
			<LineStyle>
				<color>ff000000</color>
				<width>5</width>
				<gx:physicalWidth>20</gx:physicalWidth>
				<gx:outerColor>bbbbffff</gx:outerColor>
				<gx:outerWidth>0.75</gx:outerWidth>
			</LineStyle>
		</Style>
		<Style id="AtvRoad0">
			<LineStyle>
				<color>bbbbffff</color>
				<width>3</width>
			</LineStyle>
		</Style>
		<Style id="TrailRoad0">
			<LineStyle>
				<color>ff000000</color>
				<width>5</width>
				<gx:physicalWidth>14</gx:physicalWidth>
				<gx:outerColor>bbbbffff</gx:outerColor>
				<gx:outerWidth>0.65</gx:outerWidth>
			</LineStyle>
		</Style>
		<Style id="AnimalRoad0">
			<LineStyle>
				<color>ff000000</color>
				<width>5</width>
				<gx:physicalWidth>13</gx:physicalWidth>
				<gx:outerColor>bbbbffff</gx:outerColor>
				<gx:outerWidth>0.6</gx:outerWidth>
			</LineStyle>
		</Style>
		<Style id="hl">
			<IconStyle>
				<scale>1.2</scale>
			</IconStyle>
			<LineStyle>
				<color>ffbfffff</color>
				<width>3</width>
			</LineStyle>
		</Style>
		<StyleMap id="default0">
			<Pair>
				<key>normal</key>
				<styleUrl>#default</styleUrl>
			</Pair>
			<Pair>
				<key>highlight</key>
				<styleUrl>#hl</styleUrl>
			</Pair>
		</StyleMap>
		<StyleMap id="MainRoad">
			<Pair>
				<key>normal</key>
				<styleUrl>#MainRoad0</styleUrl>
			</Pair>
			<Pair>
				<key>highlight</key>
				<styleUrl>#hl</styleUrl>
			</Pair>
		</StyleMap>
		<StyleMap id="AtvRoad">
			<Pair>
				<key>normal</key>
				<styleUrl>#AtvRoad0</styleUrl>
			</Pair>
			<Pair>
				<key>highlight</key>
				<styleUrl>#hl</styleUrl>
			</Pair>
		</StyleMap>
		<StyleMap id="TrailRoad">
			<Pair>
				<key>normal</key>
				<styleUrl>#TrailRoad0</styleUrl>
			</Pair>
			<Pair>
				<key>highlight</key>
				<styleUrl>#hl</styleUrl>
			</Pair>
		</StyleMap>
		<StyleMap id="AnimalRoad">
			<Pair>
				<key>normal</key>
				<styleUrl>#AnimalRoad0</styleUrl>
			</Pair>
			<Pair>
				<key>highlight</key>
				<styleUrl>#hl</styleUrl>
			</Pair>
		</StyleMap>
	`
}


let xml = Fs.readFileSync(Path.resolve(process.argv[2]))
//console.log(xml.toString())
//Fs.writeFileSync(Path.resolve(process.argv[3]), xml, 'utf-8')
Fs.writeFileSync(Path.resolve(process.argv[3]), xml.toString().replace(`<kml xmlns="http://www.opengis.net/kml/2.2">`, `<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">`).replace(/\<Document\>/, '<Document>'+_stylesXml.road).replace(/\<Placemark\>/g, '<Placemark>\n\t<styleUrl>#AtvRoad</styleUrl>'), 'utf-8')

/*
process.exit()
parseString(_styles, (err, styles) => {

	parseString(Fs.readFileSync(Path.resolve(process.argv[2]), 'utf-8'), (err, kml) => {
		_.merge(kml.kml.Document, styles.styles.road)
		//kml.kml.Document = _.clone(kml.kml.Document)
		kml.kml.Document[0].Placemark.forEach(p => {
			p.styleUrl = '#AtvRoad'
		})
		//_.log(kml.kml.Document)

		//_.log(kml)
		//_.logj(kml)
		let builder = new Builder()
		let xml = builder.buildObject(kml.kml)
		xml = xml.replace('<root ', '<kml ').replace('</root>', '</kml>')
		_.log(xml)

	})

})

*/

