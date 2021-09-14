
define('App/Page', ['jquery', '@js/core'], function ($) {

	function Page (elem) {
		this.Create(elem)

		return this
	}

	Page.prototype.Hide = function () {
		eval(this.fns.onHide)
		this.e.remove()
	}

	Page.prototype.Show = function (app) {
		app.append(this.e)
		eval(this.fns.onShow)
	}

	Page.prototype.Create = function (elem) {
		this.parent = elem.parentElement
		this.id = elem.id
		this.$e = $('<div class="Page">')
		this.e = this.$e[0]
		this.$e.attr('id', 'page-'+elem.id)
		elem.classList.forEach(c => {this.$e.addClass(c)}, this)
		this.$e.html($(elem).html())
		if (elem.hasAttribute('active')) {this.active = true}
		this.fns = {
			'onCreate': $(elem).attr('onCreate') || '() => {}',
			'onHide': $(elem).attr('onHide') || '() => {}',
			'onShow': $(elem).attr('onShow') || '() => {}'
		}
		elem.remove()
		eval(this.fns.onCreate)
	}

	return Page

})
