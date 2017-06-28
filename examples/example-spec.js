/* eslint-env mocha */

var expect = require('chai').expect
var tester = require('../')

describe('bootprint', function () {
  var bptest = tester(require('./module.js'), __dirname, 'test-input.json')

  // Run bootprint before all tests in this section
  before(bptest.run)

  it('should write "Nils" to index.html', function () {
    // Access the parsed index.html as cheerio-object via "bptest.$"
    expect(bptest.$('p').html()).to.contain('Nils')
  })

  it('should write a black background to the main.css file', function () {
    // Load any file from the target directory via "bptest.read()"
    expect(bptest.read('main.css')).to.contain('background:black')
  })

  it('should give normalized access to the selector contents via textIn', function () {
    // Load any file from the target directory via "bptest.read()"
    expect(bptest.textIn('p')).to.equal('name: Nils')
  })
})
