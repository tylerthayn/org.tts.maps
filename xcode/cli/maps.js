#!/usr/bin/env node

const { Command } = require('commander')
const program = new Command()


program
	.version('0.0.1')
	.description('Maps')
	.command('server [cmd]', 'server interaction')
	.command('kml [cmd]', 'kml tools')
	.command('tile', 'tile getter')

program.parse(process.argv);



