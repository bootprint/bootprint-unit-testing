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
 * @returns {{run: function, $: cheerio}} "run" can be called as "before" block,
 *  the cheerio-object of the generated index.html is store in $ thereafter.
 */
module.exports = function (bootprintModule, dir, input) {
  const targetDir = path.join('test-output', path.basename(dir))
  const rawInput = typeof input === 'string'
    ? path.join(dir, input)
    : input

  const bptest = {}

  function run () {
    return removeTree(targetDir)
      .then(() => makeTree(targetDir))
      .then(() => new Bootprint(bootprintModule, {}).run(rawInput, targetDir))
      .then(() => readFile(path.join(targetDir, 'index.html'), 'utf-8'))
      .then(indexHtml => { bptest.$ = cheerio.load(indexHtml) })
  }

  bptest.run = run

  return bptest
}
