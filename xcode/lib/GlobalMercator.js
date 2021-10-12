/* https://github.com/datalyze-solutions/globalmaptiles */
module.exports = new ((function () {const pi_div_360=Math.PI/360;const pi_div_180=Math.PI/180;const pi_div_2=Math.PI/2;const pi_4=4*Math.PI;const pi_2=2*Math.PI;const pi=Math.PI;const _180_div_pi=180/Math.PI;class GlobalMercator{constructor(){this.tileSize=256;this.initialResolution=6378137*pi_2/this.tileSize;this.originShift=6378137*pi_2/2}LatLonToMeters(lat,lon){let mx=lon*this.originShift/180;let my=Math.log(Math.tan((90+lat)*pi_div_360))/pi_div_180;return{mx:mx,my:my=my*this.originShift/180}}MetersToLatLon(mx,my){let lon=mx/this.originShift*180;let lat=my/this.originShift*180;return{lat:lat=_180_div_pi*(2*Math.atan(Math.exp(lat*pi_div_180))-pi_div_2),lon:lon}}MetersToPixels(mx,my,zoom){var res=this.Resolution(zoom);return{px:(mx+this.originShift)/res,py:(my+this.originShift)/res}}Resolution(zoom){return this.initialResolution/Math.pow(2,zoom)}TileBounds(tx,ty,zoom){let minx,miny,maxx,maxy;return{minx:minx=this.PixelsToMeters(tx*this.tileSize,ty*this.tileSize,zoom).mx,miny:miny=this.PixelsToMeters(tx*this.tileSize,ty*this.tileSize,zoom).my,maxx:maxx=this.PixelsToMeters((tx+1)*this.tileSize,(ty+1)*this.tileSize,zoom).mx,maxy:maxy=this.PixelsToMeters((tx+1)*this.tileSize,(ty+1)*this.tileSize,zoom).my}}PixelsToMeters(px,py,zoom){var res;return{mx:px*(res=this.Resolution(zoom))-this.originShift,my:py*res-this.originShift}}PixelsToTile(px,py){return{tx:Math.round(Math.ceil(px/this.tileSize)-1),ty:Math.round(Math.ceil(py/this.tileSize)-1)}}PixelsToRaster(px,py,zoom){return{x:px,y:(this.tileSize<<zoom)-py}}LatLonToTile(lat,lon,zoom){var meters=this.LatLonToMeters(lat,lon);var pixels=this.MetersToPixels(meters.mx,meters.my,zoom);return this.PixelsToTile(pixels.px,pixels.py)}MetersToTile(mx,my,zoom){var pixels=this.MetersToPixels(mx,my,zoom);return this.PixelsToTile(pixels.px,pixels.py)}GoogleTile(tx,ty,zoom){return{tx:tx,ty:Math.pow(2,zoom)-1-ty}}QuadKey(tx,ty,zoom){let quadKey='';ty=2**zoom-1-ty;for(let i=zoom;i>0;i--){let digit=0;let mask=1<<i-1;0!=(tx&mask)&&(digit+=1);0!=(ty&mask)&&(digit+=2);quadKey+=digit.toString()}return quadKey}QuadKeyToTile(quadKey){let tx=0;let ty=0;let zoom=quadKey.length;for(let i=0;i<zoom;i++){let bit=zoom-i;let mask=1<<bit-1;'1'===quadKey[zoom-bit]&&(tx|=mask);'2'==quadKey[zoom-bit]&&(ty|=mask);if('3'==quadKey[zoom-bit]){tx|=mask;ty|=mask}}return{tx:tx,ty:ty=2**zoom-1-ty,zoom:zoom}}};return GlobalMercator})())()

/*
	x=>longitude
	y=>latitude

	Size

	Point
		[x, y]
		Swap()
	Point.LatLon(lat, lon) && Point.LonLat(lon, lat)
		[lon, lat]
		-key
		ToMeters()
		ToPixels(zoom)

	Point.Meters
		[x, y]
		-key
		ToLatLon
		ToLonLat
		ToPixel(zoom)

	Point.Pixel
		[x, y]
		-key
		ToLonLat
		ToLatLon
		ToMeters

	Range
		[min, max]
		Within(val)
		Position(val)

	Bounds
		[minx, miny, maxx, maxy]
		range{x: [min, max], y: [min, max]}
		Positions(points...)
	Bounds.LonLat
		[minLon, minLat, maxLon, maxLat]
		range{lon: [min, max], lat: [min, max]]

	Geometry
		Base
			type
			coordinates
			Use()
			Render()

		Point
		LineString
		Polygon
		MultiLine
		MultiPolygon
	Properties
	Tags

	Feature
		Type
		Id
		Properties
		Geometry

	FeatureCollection
		type
		features[]

	Mercator.LatLon


*/

