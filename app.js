import program from './utils/commander.js'
import sort from './modules/sorting.js'
import createFolderIsNotExist from './utils/createFolder.js'
import Watcher from './modules/watcher.js'
import checkIsExists from './utils/checkIsExistsFolder.js'

program.parse(process.argv)

const sorting = sort(program.output, +program.criteria, new Watcher())

if (checkIsExists(program.folders)) {
  console.log(`Not found some of folders: ${program.folders.toString()}`)
} else {
  createFolderIsNotExist(program.output)
  sorting(program.folders)
}
