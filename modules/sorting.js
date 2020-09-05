import * as path from 'path'
import * as fs from 'fs'

import { handleError } from '../utils/handle-error.js'
import createFolderIsNotExist from '../utils/createFolder.js'

const criteriaExtFile = file => {
  const folder = path.extname(file.path)
  return path.join(file.dist, folder)
}

const criteriaSizeFile = file => {
  const folder = file.size.toString()
  return path.join(file.dist, folder)
}

const criteriaAlphabetFile = file => {
  const indexLetter = 0
  const folder = file.name[indexLetter].toUpperCase()
  return path.join(file.dist, folder)
}

const criteriaForSortingDirs = (file) => {
  switch (file.criteria) {
    case 0:
      return criteriaAlphabetFile(file)
    case 1:
      return criteriaSizeFile(file)
    default:
      return criteriaExtFile(file)
  }
}

const copyFile = (file, callback) => {
  const dir = criteriaForSortingDirs(file)
  createFolderIsNotExist(dir)
  fs.copyFile(file.path, path.join(dir, file.name), err => {
    if (err) {
      return handleError(err)
    }

    callback()
  })
}

const sort = (dist, criteria = 0, watcher) => {
  const readFolder = base => {
    watcher.startProccess(base)

    fs.readdir(base, (err, files) => {
      if (err) {
        handleError(err)
        return
      }

      for (const file of files) {
        const localBase = path.resolve(base, file)
        const state = fs.statSync(localBase)

        if (state.isDirectory()) {
          readFolder(localBase)
        } else {
          watcher.startProccess(localBase)

          copyFile({
            dist,
            criteria,
            size: state.size,
            name: file,
            path: localBase
          }, () => {
            watcher.endProccess(localBase)
          })
        }
      }
    })
  }

  return (folders) => {
    folders.forEach(base => {
      watcher.started()
      readFolder(base)
      watcher.endProccess(base)
    })
  }
}

export default sort
