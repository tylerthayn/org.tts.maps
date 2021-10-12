#!/usr/bin/env node

const { Command } = require('commander')
const program = new Command()
const { spawn } = require('child_process')
let Path = require('path')

program
	.version('0.0.1')
	.description('start maps server')

program.parse(process.argv)

let args = [Path.resolve(__dirname, '../server/index.js')]

let server = spawn(node, args, {cwd: Path.resolve(__dirname, '../'), detached: true})
setTimeout(() => {
	console.log(server)
}, 2000)



