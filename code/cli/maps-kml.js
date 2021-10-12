#!/usr/bin/env node

const { Command } = require('commander')
const program = new Command()


program
	.version('0.0.1')
	.description('Maps :: Kml Tools')
	.command('export', 'export to another format')
	.command('styles', 'styles management')

program.parse(process.argv);



