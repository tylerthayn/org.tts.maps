window.log = console.log

require(['jquery', 'lodash-tts', 'style!@css/Tiles'], function ($, _) {
	function CopyToClipboard(e){let selection=window.getSelection(),range=document.createRange();range.selectNodeContents(e.target);selection.removeAllRanges();selection.addRange(range);document.execCommand('copy');window.getSelection().removeAllRanges()}

	window.LoadTile = (type, zoom, key, original = false) => {
		$('img.Tile')[0].src = '/tiles/'+type+'/'+zoom+'/'+key+'.jpg' + (original ? '?original' : '')

		$.get(new URL($('img.Tile')[0].src).pathname.replace('.jpg', '.json'), (data) => {
			log(data)
			$('.Property.Id .Value').text(data.key)
			$('.Property.Center .Value').text((parseFloat(data.bounds[0]) + (parseFloat(data.bounds[2]) - parseFloat(data.bounds[0]))/2).toFixed(5) + ', ' + (parseFloat(data.bounds[1]) + (parseFloat(data.bounds[3]) - parseFloat(data.bounds[1]))/2))
			$('.Property.Bounds .Value').text(data.bounds)
		})

	}

	window.LoadTile(location.pathname.split('/')[2], location.pathname.split('/')[3], location.pathname.split('/')[4], location.href.match(/original/i) != null ? true : false)

	$(() => {
		$('.Details .Property .Value').on('click', CopyToClipboard)


		$('i.Arrow').on('click', (e) => {
			let Update = (data) => {
				console.log(data)
				window.LoadTile(new URL($('img.Tile')[0].src).pathname.split('/')[2], new URL($('img.Tile')[0].src).pathname.split('/')[3], data.key, location.href.match(/original/i) != null ? true : false)
			}

			if (e.target.classList.contains('Down')) {
				$.get(new URL($('img.Tile')[0].src).pathname.replace('.jpg', '') + '/grid/0/-1' + new URL($('img.Tile')[0].src).search, Update)
			}
			if (e.target.classList.contains('Up')) {
				$.get(new URL($('img.Tile')[0].src).pathname.replace('.jpg', '') + '/grid/0/1' + new URL($('img.Tile')[0].src).search, Update)
			}
			if (e.target.classList.contains('Left')) {
					$.get(new URL($('img.Tile')[0].src).pathname.replace('.jpg', '') + '/grid/-1/0' + new URL($('img.Tile')[0].src).search, Update)

			}
			if (e.target.classList.contains('Right')) {
					$.get(new URL($('img.Tile')[0].src).pathname.replace('.jpg', '') + '/grid/1/0' + new URL($('img.Tile')[0].src).search, Update)

			}

		})
		$('div.Details').draggable()
	})
})


