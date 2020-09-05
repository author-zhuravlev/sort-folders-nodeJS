import del from 'del'
import program from '../utils/commander.js'

class Watcher {
  constructor() {
    this.proccess = []
    this.isStarted = false
  }

  started() {
    this.isStarted = true
  }

  onComplete(el) {
    console.log('Sorting complete. We can remove source folder')
    if (program.delete) {
      del(el)
        .then(() => console.log('Folder is delete!'))
    }
  }

  checkOnComplete(el) {
    if (this.isStarted && this.proccess.length === 0) {
      this.isStarted = false
      this.onComplete(el)
    }
  }

  startProccess(el) {
    this.proccess.push(el)
  }

  endProccess(el) {
    const index = this.proccess.findIndex(item => item === el)
    this.proccess.splice(index, 1)
    this.checkOnComplete(el)
  }
}

export default Watcher
