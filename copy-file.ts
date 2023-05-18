import * as fs from 'fs-extra'
import * as path from 'path'

const root = __dirname;
const faKit = path.join(root, 'new', 'kit.fontawesome.com', 'eb936bb355.js')
fs.copyFileSync(faKit, path.join(root, 'fa.js'))
