
define('App/Menubar', ['jquery'], function ($) {
	let menubar = {}
	let e = undefined
	let $e = undefined
	let wrapper = $('<div class="MenubarContainer">')

	function Hide () {$e.addClass('Hidden')}
	function Show () {$e.removeClass('Hidden')}
	function Unwrap(){e.remove();wrapper.remove();$('.App').prepend(e)}
	function Wrap(){e.remove();wrapper.append(e);$('.App').prepend(wrapper)}

	Define(menubar, 'AutoHide', function (autoHide = true) {
		if (autoHide) {
			Wrap()
			$e.addClass('Hidden')
			wrapper.on('mouseenter', Show)
			wrapper.on('mouseleave', Hide)
			$(wrapper[0].nextElementSibling).css({top: '0px', height: '100%'})
		} else {
			wrapper.off('mouseenter', Show)
			wrapper.off('mouseleave', Hide)
			Unwrap()
			$(e.nextElementSibling).css({top: $e.css('height'), height: 'calc( 100% - '+$e.css('height')+' )'})
			$e.removeClass('Hidden')
		}
	})

	Define(menubar, 'Init', function () {
		$e = $('.App .Menubar')
		e = $e[0]
		this.AutoHide($e.hasClass('Hidden'))
	})

	return menubar
})
