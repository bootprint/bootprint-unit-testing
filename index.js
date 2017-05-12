/*!
 * bootprint-unit-testing <https://github.com/bootprint/bootprint-unit-testing>
 *
 * Copyright (c) 2017 Nils Knappmeier.
 * Released under the MIT license.
 */

var pify = require('pify')
var readFile = pify(require('fs').readFile)
var makeTree = pify(require('mkdirp'))
var removeTree = pify(require('rimraf'))
var cheerio = require('cheerio')
var path = require('path')
var {Bootprint} = require('bootprint')

/**
 * Create a new tester-object for a given bootprint-module
 * @param bootprintModule
 * @param dir the directory(-name) from which this function is called
 * @param input the name of the file that contains the input for
 *  bootprint (relative to "dir")
 * @returns {BootprintTest} "run" can be called as "before" block,
 *  the cheerio-object of the generated index.html is store in $ thereafter.
 */
module.exports = function (bootprintModule, dir, input) {
  let bootprintTest = new BootprintTest(bootprintModule, dir, input)
  // Make sure that "this" is the correct object
  bootprintTest.run = bootprintTest.run.bind(bootprintTest)
  return bootprintTest
}

class BootprintTest {
  constructor (bootprintModule, dir, input) {
    this.bootprintModule = bootprintModule
    this.targetDir = path.join('test-output', path.basename(dir))
    this.rawInput = typeof input === 'string'
      ? path.join(dir, input)
      : input
    this.dir = dir
  }

  run () {
    return removeTree(this.targetDir)
      .then(() => makeTree(this.targetDir))
      .then(() => new Bootprint(this.bootprintModule, {}).run(this.rawInput, this.targetDir))
      .then(() => readFile(path.join(this.targetDir, 'index.html'), 'utf-8'))
      .then(indexHtml => { this.$ = cheerio.load(indexHtml) })
  }
}
