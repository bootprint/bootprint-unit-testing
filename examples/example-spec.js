/* eslint-env mocha */

var expect = require('chai').expect
var tester = require('../')

describe('with an input file', function () {
  var bptest = tester(require('./module.js'), __dirname, 'test-input.json')

  // Run bootprint. The parsed "index.html"-file (cheerio) is then available
  // under "bptest.$"
  before(bptest.run)

  it('should store a cheerio-elements as `.$`', function () {
    expect(bptest.$('p').html()).to.contain('Nils')
  })
})
