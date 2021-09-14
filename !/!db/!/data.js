let Fs = require('fs')
let type = process.argv[2]

console.log(Fs.readdirSync(type, 'utf-8').map(s=>{return type+'('+s.split('.')[0]+');'}).join('out geom;')+'out geom;')


