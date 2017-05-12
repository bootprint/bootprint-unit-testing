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
})
