
/* eslint-disable */
const getTestFiles = (dir, filelist = []) => {
  let fs = require('fs')
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const path = `${dir}/${file}`
    filelist = fs.statSync(path).isDirectory() ? getTestFiles(path, filelist) : [...filelist, path]
  })
  return filelist
}


const Mocha = require('mocha');
const mocha = new Mocha({
  ignoreLeaks: true,
  recursive: true
})

getTestFiles('./test').forEach(path => mocha.addFile(path))

module.exports = mocha;

mocha.run();