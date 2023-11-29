const fs = require('fs')
const path = require('path')
const testResourcePath = path.join(process.cwd(), 'test/e2e/elements/wiwi')

fs.copyFileSync(path.join(process.cwd(), 'build/bundle.js'), path.join(testResourcePath, 'bundle.js'))
fs.copyFileSync(path.join(process.cwd(), 'build/vendor.bundle.js'), path.join(testResourcePath, 'vendor.bundle.js'))
fs.copyFileSync(path.join(process.cwd(), 'meta-widget.json'), path.join(testResourcePath, 'meta-widget.json'))
