/*!
 * bootprint-unit-testing <https://github.com/bootprint/bootprint-unit-testing>
 *
 * Copyright (c) 2017 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe */
/* global it */
/* global before */
// /* global xit */

'use strict'

let chai = require('chai')
chai.use(require('dirty-chai'))
var expect = chai.expect
var tester = require('../')
var fs = require('fs')
var path = require('path')

describe('The bootprint-unit-testing module', function () {
  this.timeout(10000)

  describe('the .$ property', function () {
    describe('when an input file was provided', function () {
      var bptest = tester(require('./fixtures/module.js'), __dirname, 'fixtures/test-input.json')

      before(bptest.run)
      it('should contain a cheerio-element of the index.html-file', function () {
        expect(bptest.$('p').html()).to.contain('Nils')
      })
    })

    describe('when an input object was provided', function () {
      var bptest = tester(require('./fixtures/module.js'), __dirname, {name: 'Nils'})

      before(bptest.run)

      it('should contain a cheerio-element of the index.html-file', function () {
        expect(bptest.$('p').html()).to.contain('Nils')
      })
    })
  })

  describe('the read()-function', function () {
    var bptest = tester(require('./fixtures/module.js'), __dirname, {name: 'Nils'})
    before(bptest.run)

    it('should return the string contents of a file in the target directory (sync)', function () {
      fs.writeFileSync(path.join(bptest.targetDir, 'test.txt'), 'abc')
      expect(bptest.read('test.txt')).to.equal('abc')
    })

    it('should return undefined for non-existing files', function () {
      expect(bptest.read('test2.txt')).not.to.be.ok()
    })

    it('should throw an error for other errors', function () {
      expect(() => bptest.read('.')).to.throw(Error)
    })
  })

  describe('the textIn()-function', function () {
    var bptest = tester(require('./fixtures/module.js'), __dirname, {name: '  Nils  \n   Knappmeier  '})
    before(bptest.run)

    it('should return the text()-contents of an element, normalized to single spaces and trimmed', function () {
      expect(bptest.textIn('p')).to.equal('name: Nils Knappmeier')
    })
  })
})
