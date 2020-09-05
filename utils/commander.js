import commander from 'commander'
const { program } = commander

export default program
  .version('0.0.1')
  .requiredOption('-f, --folders [type...]', 'Input source folders')
  .option('-o, --output [type]', 'Input output folder(default "./test")', './dist')
  .option('-d, --delete', 'Delete the source folder')
  .option('-c, --criteria [type]', 'Criteria for sorting')
