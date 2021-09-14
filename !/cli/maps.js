let _ = require('org.tts.js.lodash')
const { program } = require('commander')

program
  .version('0.1.0')
  .command('create', 'install one or more packages')
  .command('features', 'search with optional query')
  .command('join', 'update installed packages', { executableFile: 'myUpdateSubCommand' })
  .command('export', 'list packages installed', { isDefault: true })

program.parse(process.argv);
