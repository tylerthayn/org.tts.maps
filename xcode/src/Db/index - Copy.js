
function File () {
	this.name = ''
	this.folder = ''
	this.versions = []
	this.latest = ''

	this.Content = (version) => {}
	this.Update = (content) => {}

}


function Folder () {
	this.path = ''
	this.Namer = () => {}
	this.Fetcher = () => {}

	this.Files = {get: () => {}}

	return this
}

let defaults = {
	folders: {

	}
}

function Db () {


}