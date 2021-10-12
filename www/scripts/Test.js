
require(['org.tts.js.lodash', 'org.tts.js.Maps'], (_, Maps) => {
	log(Maps)
	let p = new Maps.Point.XY(1,1)
	log(_.Type(p))
})

