
require(['jquery', 'org.tts.js.lodash', 'ui/features', 'ui/map', 'style!@css/Map'], function($, _, Features, Map) {
	window.ui = {
		Features: Features,
		Map: undefined,
		Resize: () => {localStorage.width=$('.Resizable').width();localStorage.height=$('.Resizable').height();$('.Resizable').nextAll('.Vertical').width(innerWidth-$('.Resizable').width());$('.Resizable').nextAll('.Vertical').css('left',$('.Resizable').width()+5);$('.Resizable').nextAll('.Horizontal').width($('.Resizable').width());$('.Resizable').nextAll('.Horizontal').height(innerHeight-$('.Resizable').height());$('.Resizable').nextAll('.Horizontal').css('top',$('.Resizable').height()+5)},
		Size: () => {$('.Resizable').width(localStorage['width']);$('.Resizable').height(localStorage['height'])}
	}

	window.ui.Size()
	window.ui.Resize()
	$('.Resizable').resizable({create: window.ui.Resize, resize: window.ui.Resize, handles: 'e, s'})

	window.initMap = () => {
		delete window.initMap
		$(() => {
			window.ui.Map = new Map()
			$('body').removeClass('Hidden')
		})
	}

	$(document.head).append($('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2HJJeEeMMgy0qd5c6O7CrjN9O68QfIcQ&libraries=drawing&callback=initMap&v=weekly" async></script>'))

})


