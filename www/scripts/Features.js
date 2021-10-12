
require(['jquery', 'lodash-tts', 'style!@css/Features'], function ($, _) {
	$(() => {
		$('.Viewer').draggable()
		//let reqData = new URL(location.href).pathname.split('/')
		//$.get('/features/'+reqData[2]+'/'+reqData[3]+'.json', (data) => {
		//	$('textarea.Editor').val(JSON.stringify(data, null, 4))
		//})
	})


/*
	$(() => {
		let c = $('canvas.Preview')[0]
		let ctx = c.getContext('2d')
		ctx.moveTo(0,0)
		ctx.lineTo(200, 100)
		ctx.stroke()
	})
*/

})


