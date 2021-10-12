#!/usr/bin/env node

let Fs = require('fs'), Path = require('path')
const { spawn } = require('child_process')
const { Command } = require('commander')
const program = new Command()
const { SystemTask } = require("system-tasks")


function Kill (pid) {
	let kill = spawn('taskkill', ['/PID', pid, '/T', '/F'])
	kill.on('close', () => {
		process.exit()
	})
	kill.on('error', (error) => {
		throw error
	})
}

program
	.version('0.0.1')
	.description('Maps Server')

program
	.command('status')
	.description('server status')
	.action(() => {
		let pid = Fs.readFileSync(Path.resolve(__dirname, '../server/pid'), 'utf-8')
		SystemTask.tasks().then(({ tasks, stdout }) => {
			tasks.forEach(task => {
				if (task.pid == pid) {
					console.log('running')
					process.exit()
				}
			})
			console.log('unavailable')
			process.exit()
		})
	})

program
	.command('start')
	.description('start server')
	.action(() => {
		let args = [Path.resolve(__dirname, '../server/index.js')]

		let server = spawn('node', args, {cwd: Path.resolve('D:/Maps'), detached: true})
		server.on('spawn', () => {
			console.log(server.pid)
			process.exit()
		})
	})

program
	.command('stop')
	.description('stop server')
	.action(() => {
		let pid = Fs.readFileSync(Path.resolve(__dirname, '../server/pid'), 'utf-8')
		console.log(pid)
		SystemTask.tasks().then(({ tasks, stdout }) => {
			let running = false
			tasks.forEach(task => {
				if (task.pid == pid) {
					running = true
					Kill(pid)
				}
			})
			if (!running) {
				console.log('not running')
				process.exit()
			}
		})
	})

program.parse(process.argv);



