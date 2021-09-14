let _ = require('org.tts.js.lodash')
const { program } = require('commander')

program
  .version('0.1.0')
  .command('node', 'Create new Node')
  .command('way', 'Create new Way')
  .command('relation', 'Create new Relation')

program.parse(process.argv);
