const { Command } = require('commander');
const { comparePrices } = require('./commands/comparePrices');
const { listConnectors } = require('./commands/listConnectors');
const { filterResults } = require('./commands/filterResults');
const { exportData } = require('./commands/exportData');

const program = new Command();

program
  .version('1.0.0')
  .command('compare')
  .description('Compare prices')
  .action(comparePrices);

program
  .command('list')
  .description('List available connectors')
  .action(listConnectors);

program
  .command('filter')
  .description('Filter results')
  .action(filterResults);

program
  .command('export')
  .description('Export data')
  .action(exportData);

program.parse(process.argv);
