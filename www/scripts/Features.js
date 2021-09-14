
require(['jquery', 'lodash-tts', 'style!@css/Features'], function ($, _) {
	$(() => {
		$('.Viewer').draggable()
		let reqData = new URL(location.href).pathname.split('/')
		$.get('/features/'+reqData[2]+'/'+reqData[3]+'.json', (data) => {
			$('textarea.Editor').val(JSON.stringify(data, null, 4))
		})
	})
})


