import * as fs from 'fs'

export default folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
}
