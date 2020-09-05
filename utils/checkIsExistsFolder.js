import * as fs from 'fs'

export default (folders) => folders.every(folder => !fs.existsSync(folder))
